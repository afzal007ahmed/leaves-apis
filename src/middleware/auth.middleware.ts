import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index';

export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('token not found');
      }
      const preAuth = authHeader.split(' ')[0];
      const postAuth = authHeader.split(' ')[1];
      if (!preAuth) {
        throw new UnauthorizedException('Bearer is missing from header');
      }
      if (!postAuth) {
        throw new UnauthorizedException('token is missing');
      }
      const user = jwt.verify(postAuth, config.jwt.secret);
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
