import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dto/apply-leave-dto';
import { UpdateLeaveDto } from './dto/update-leave-dto';
import { AuthGaurd } from 'src/gaurd/auth.gaurd';

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
  @UseGuards(AuthGaurd)
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
    return await this.leaveService.updateLeave(user, body, id);
  }
  @Delete('/:id')
  async deleteLeave(@Param('id') id: string, @Request() req: any) {
    const user = req.user;
    return await this.leaveService.deleteLeave(user, id);
  }
  @UseGuards(AuthGaurd)
  @Patch('/:id/approve')
  async approveLeaveRequest(@Request() req: any, @Param('id') id: string) {
    const user = req.user;
    return await this.leaveService.approveLeaveRequest(user, id);
  }
  @UseGuards(AuthGaurd)
  @Patch('/:id/reject')
  async rejectLeaveRequest(@Request() req: any, @Param('id') id: string) {
    const user = req.user;
    return await this.leaveService.rejectLeaveRequest(user, id);
  }
}
