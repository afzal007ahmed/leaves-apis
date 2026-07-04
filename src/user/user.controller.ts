import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return await this.userService.loginUser(body);
  }
}
