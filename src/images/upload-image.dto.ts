import { IsString, IsBase64, IsDateString, IsEnum } from 'class-validator';

enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class UploadImageDto {
  @IsBase64()
  readonly image: string;

  @IsString()
  readonly customer_code: string;

  @IsDateString()
  readonly measure_datetime: string;

  @IsEnum(MeasureType)
  readonly measure_type: 'WATER' | 'GAS';
}
