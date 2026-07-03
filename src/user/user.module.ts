import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [],
  controllers: [],
  exports: [],
})
export class UserModule {}
