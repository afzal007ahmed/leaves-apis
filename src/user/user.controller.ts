import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body: createUserDto) {
    return await this.userService.loginUser(body);
  }
}
