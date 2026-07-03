import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import jwt from 'jsonwebtoken';
import { config } from './../../config/index';

interface createUserInterface {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  async loginUser(data: createUserInterface) {
    const userData = await User.create(data);
    const payload = { id: userData.id, role: userData.role };
    const token = jwt.sign(payload, config.jwt.secret as string);
    return {
      success: true,
      token,
    };
  }
}
