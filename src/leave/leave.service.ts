import { Injectable, NotFoundException } from '@nestjs/common';
import { Leaves } from './model/leave.model';

interface ApplyLeaveInterface {
  reason: string;
  fromDate: Date;
  toDate: Date;
}

interface UpdateLeaveInterface {
  reason?: string;
  fromDate?: Date;
  toDate?: Date;
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
  myLeaves(user: UserDataInterface) {
    return Leaves.findAll({ where: { userId: user.id } });
  }
  async updateLeave(
    user: UserDataInterface,
    data: UpdateLeaveInterface,
    id: string,
  ) {
    const leaveData = await Leaves.findOne({
      where: { id: id, userId: user.id },
    });
    if (!leaveData) {
      throw new NotFoundException(
        'Leave not found/this leave does not belongs to you.',
      );
    }
    return await Leaves.update(
      { ...data },
      { where: { id: id, userId: user.id } },
    );
  }
}
