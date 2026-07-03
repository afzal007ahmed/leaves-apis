import { Model } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';

interface LeaveTableInterface {
  reason: string;
  fromDate: string;
  toDate: string;
  status: string;
  userId: string;
}

@Table({
  tableName: 'leaves',
})
export class Leaves extends Model<LeaveTableInterface> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reason: string;
  @Column({ type: DataType.DATE, allowNull: false })
  fromDate: string;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  toDate: string;
  @Column({
    type: DataType.ENUM('Pending', 'Approved', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending',
  })
  status: string;
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
}
