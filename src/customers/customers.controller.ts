import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async upload(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto.code);
  }
}
