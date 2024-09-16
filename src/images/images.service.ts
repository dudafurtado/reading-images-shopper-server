import { Injectable, BadGatewayException } from '@nestjs/common';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import { IConfirm, IUpload } from 'src/interfaces/images.interfaces';

@Injectable()
export class ImagesService {
  private readonly prisma = new PrismaClient();

  async checkForDuplicate(measureDatetime: string) {
    const date = new Date(measureDatetime);
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const startOfNextMonth = new Date(year, month + 1, 1);

    const duplicate = await this.prisma.measure.findFirst({
      where: {
        datetime: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
    });

    if (duplicate) {
      return true;
    }

    return false;
  }

  async create(payload: IUpload, appKey: string) {
    const image = await this.upload(payload.image, appKey);

    await this.prisma.customer.findFirst({
      where: {
        code: payload.customer_code,
      },
    });

    const measure = await this.prisma.measure.create({
      data: {
        uuid: uuidv4(),
        datetime: payload.measure_datetime,
        type: payload.measure_type,
        has_confirmed: false,
        image_url: image.image_url,
        value: image.measure_value,
        customer_id: payload.customer_code,
      },
    });

    return {
      image_url: measure.image_url,
      measure_value: measure.value,
      measure_uuid: measure.uuid,
    };
  }

  async upload(base64Image: string, appKey: string) {
    try {
      const fileManager = new GoogleAIFileManager(appKey);
      const tempFilePath = `/tmp/${uuidv4()}.jpg`;
      await fs.writeFile(tempFilePath, base64Image, 'base64');

      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: 'image/jpeg',
        displayName: 'Uploaded Image',
      });

      await fs.unlink(tempFilePath);

      const { file } = uploadResponse;

      return {
        image_url: file.uri,
        measure_value: file.sizeBytes,
        created_at: file.createTime,
        updated_at: file.updateTime,
      };
    } catch (error) {
      throw new BadGatewayException({
        error_code: 'EXTERNAL_API_ERROR',
        error_description: 'Falha ao se comunicar com a API externa ' + error,
      });
    }
  }

  async findMeasure(uuid: string) {
    return await this.prisma.measure.findUnique({
      where: { uuid },
    });
  }

  async confirm(payload: IConfirm) {
    await this.prisma.measure.update({
      where: { uuid: payload.measure_uuid },
      data: { has_confirmed: true, value: payload.confirmed_value },
    });
  }

  async findMeasuresByCustomerAndType(
    customerCode: string,
    measureType: 'WATER' | 'GAS',
  ) {
    return await this.prisma.measure.findMany({
      where: {
        customer: { code: customerCode },
        type: measureType,
      },
    });
  }
}
