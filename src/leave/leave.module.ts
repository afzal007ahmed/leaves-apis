import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leaves } from './model/leave.model';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';

@Module({
  imports: [SequelizeModule.forFeature([Leaves])],
  providers: [ LeaveService],
  exports: [],
  controllers: [LeaveController],
})
export class LeavesModule {}
