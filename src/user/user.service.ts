import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/user.model';
import jwt from 'jsonwebtoken';
import { config } from './../../config/index';
import bcrypt from 'bcrypt';

interface LoginUserInterface {
  email: string;
  password: string;
}

interface CreateUserInterface {
  name: string;
  password: string;
  role: string;
  email: string;
}

@Injectable()
export class UserService {
  async loginUser(data: LoginUserInterface) {
    const userData = await User.findOne({ where: { email: data.email } });
    if (!userData) {
      throw new NotFoundException("user not found")
    }
    const payload = { id: userData.id, role: userData.role };
    const token = jwt.sign(payload, config.jwt.secret as string, {
      expiresIn: '7d',
    });
    return {
      success: true,
      token,
    };
  }
  async createUser(data: CreateUserInterface) {
    const { password, ...userDetails } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      ...userDetails,
      password: hashedPassword,
    });
    const payload = { id: userData.id, role: userData.role };
    const token = jwt.sign(payload, config.jwt.secret as string, {
      expiresIn: '7d',
    });
    return {
      token,
      success: true,
    };
  }
}
