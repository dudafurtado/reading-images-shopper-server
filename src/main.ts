import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const errorDescriptions = errors.map((error) => {
          const constraints = Object.values(error.constraints).join(', ');
          return `${error.property}: ${constraints}`;
        });

        return new BadRequestException({
          error_code: 'INVALID_DATA',
          error_description: `${errorDescriptions.join('; ')}`,
        });
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();
