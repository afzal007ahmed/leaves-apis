import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
  @Type(() => Date)
  @IsDate()
  fromDate: Date;
  @Type(() => Date)
  @IsDate()
  toDate: Date;
}
