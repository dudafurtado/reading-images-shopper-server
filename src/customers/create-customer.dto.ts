import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly code: string;
}
