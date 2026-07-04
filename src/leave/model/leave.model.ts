import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';

interface LeaveTableInterface {
  id?: string;
  reason: string;
  fromDate: Date;
  toDate: Date;
  status?: string;
  userId: string;
}

@Table({
  tableName: 'leaves',
})
export class Leaves extends Model<LeaveTableInterface> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
