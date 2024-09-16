import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { CustomerModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [
    ImagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomersService],
})
export class AppModule {}
