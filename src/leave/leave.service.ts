import { Injectable } from '@nestjs/common';
import { Leaves } from './model/leave.model';

interface ApplyLeaveInterface {
  reason: string;
  fromDate: Date;
  toDate: Date;
}

interface UserDataInterface {
  id: string;
  role: string;
}

@Injectable()
export class LeaveService {
  applyLeave(data: ApplyLeaveInterface, user: UserDataInterface) {
    return Leaves.create({ ...data, userId: user.id });
  }
}
