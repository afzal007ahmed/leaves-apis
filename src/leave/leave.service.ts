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
    return Leaves.findAll({ where: { userId: user.id, status: 'Pending' } });
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
  async deleteLeave(user: UserDataInterface, id: string) {
    const leaveData = await Leaves.findOne({
      where: { id: id, userId: user.id, status: 'Pending' },
    });
    if (!leaveData) {
      throw new NotFoundException(
        "Unable to find this leave. This leave may be not pending or not your's.",
      );
    }
    return await Leaves.destroy({
      where: { id: id, userId: user.id, status: 'Pending' },
    });
  }
  async approveLeaveRequest(user: UserDataInterface, id: string) {
    const leaveData = await Leaves.findOne({
      where: { id: id, userId: user.id, status: 'Pending' },
    });
    if (!leaveData) {
      throw new NotFoundException(
        'Unable to find this leave. This leave may be not pending.',
      );
    }
    return await Leaves.update(
      { status: 'Approved' },
      { where: { id: id, userId: user.id, status: 'Pending' } },
    );
  }
  async rejectLeaveRequest(user: UserDataInterface, id: string) {
    const leaveData = await Leaves.findOne({
      where: { id: id, userId: user.id, status: 'Pending' },
    });
    if (!leaveData) {
      throw new NotFoundException(
        'Unable to find this leave. This leave may be not pending.',
      );
    }
    return await Leaves.update(
      { status: 'Rejected' },
      { where: { id: id, userId: user.id, status: 'Pending' } },
    );
  }
}
