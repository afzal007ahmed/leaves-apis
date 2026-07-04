import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Leaves } from 'src/leave/model/leave.model';

interface userTableInterface {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<userTableInterface> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @HasMany(() => Leaves)
  leaves: Leaves[];

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataTypes.ENUM('employee', 'manager'),
    defaultValue: 'employee',
  })
  role: string;
}
