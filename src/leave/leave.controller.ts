import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dto/apply-leave-dto';
import { UpdateLeaveDto } from './dto/update-leave-dto';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/')
  applyLeave(@Body() body: ApplyLeaveDto, @Request() req: any) {
    if (body.toDate <= body.fromDate) {
      throw new BadRequestException(
        'from date should be greater than to date.',
      );
    }
    const user = req.user;
    return this.leaveService.applyLeave(body, user);
  }
  @Get('/')
  myLeaves(@Request() req: any) {
    const user = req.user;
    return this.leaveService.myLeaves(user);
  }
  @Patch('/:id')
  async updateLeave(
    @Param('id') id: string,
    @Body() body: UpdateLeaveDto,
    @Request() req: any,
  ) {
    const user = req.user;
    return this.leaveService.updateLeave(user, body, id);
  }
}
