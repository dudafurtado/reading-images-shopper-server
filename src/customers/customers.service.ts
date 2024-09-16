import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CustomersService {
  private readonly prisma = new PrismaClient();

  async create(code: string) {
    return await this.prisma.customer.create({
      data: {
        code,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}
