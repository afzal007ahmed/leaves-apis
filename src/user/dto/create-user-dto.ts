import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  role: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
