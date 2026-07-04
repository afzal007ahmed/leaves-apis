import { BadRequestException, Body, Controller, Param, Post, Request } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dto/apply-leave-dto';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('')
  applyLeave(@Body() body: ApplyLeaveDto, @Request() req: any) {
    if( body.toDate <= body.fromDate ) {
        throw new BadRequestException("from date should be greater than to date.")
    }
    const user = req.user;
    return this.leaveService.applyLeave(body, user);
  }
}
