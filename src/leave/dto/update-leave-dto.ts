import { Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class UpdateLeaveDto {
  @IsString()
  reason: string;
  @Type(() => Date)
  @IsDate()
  toDate: Date;
  @Type(() => Date)
  @IsDate()
  fromDate: Date;
}
