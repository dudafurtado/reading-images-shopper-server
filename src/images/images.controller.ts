import {
  Controller,
  Body,
  Post,
  Patch,
  Get,
  Param,
  Query,
  ConflictException,
  BadRequestException,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from './images.service';
import { UploadImageDto } from './upload-image.dto';
import { ConfirmImageDto } from './confirm-image.dto';

@Controller()
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private configService: ConfigService,
  ) {}

  @Post('upload')
  async upload(@Body() uploadImageDto: UploadImageDto) {
    const isDuplicate = await this.imagesService.checkForDuplicate(
      uploadImageDto.measure_datetime,
    );

    if (isDuplicate) {
      throw new ConflictException({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    const appKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!appKey) {
      throw new BadGatewayException({
        error_code: 'MISSING_API_KEY',
        error_description: 'A chave da API não está definida.',
      });
    }

    const image = await this.imagesService.create(uploadImageDto, appKey);

    return image;
  }

  @Patch('confirm')
  async confirm(@Body() confirmImageDto: ConfirmImageDto) {
    const measure = await this.imagesService.findMeasure(
      confirmImageDto.measure_uuid,
    );

    if (!measure) {
      throw new NotFoundException({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura do mês já realizada',
      });
    }

    if (measure.has_confirmed) {
      throw new ConflictException({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada',
      });
    }

    await this.imagesService.confirm(confirmImageDto);

    return {
      success: true,
    };
  }

  @Get(':costumer_code/list')
  async list(
    @Param('customer_code') customerCode: string,
    @Query('measure_type') measureType: 'WATER' | 'GAS',
  ) {
    const measureTypeCasaInsensitive = measureType.toUpperCase();
    const validMeasureTypes = ['WATER', 'GAS'];

    if (!validMeasureTypes.includes(measureTypeCasaInsensitive)) {
      throw new BadRequestException({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    const measures = await this.imagesService.findMeasuresByCustomerAndType(
      customerCode,
      measureType,
    );

    if (!measures || measures.length === 0) {
      throw new NotFoundException({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    return measures;
  }
}
