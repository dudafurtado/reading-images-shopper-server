import { IsUUID, IsInt } from 'class-validator';

export class ConfirmImageDto {
  @IsUUID()
  readonly measure_uuid: string;

  @IsInt()
  readonly confirmed_value: number;
}
