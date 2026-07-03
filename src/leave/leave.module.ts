import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leaves } from './model/leave.model';

@Module({
  imports: [SequelizeModule.forFeature([Leaves])],
  providers: [],
  exports: [],
  controllers: [],
})
export class LeavesModule {}
