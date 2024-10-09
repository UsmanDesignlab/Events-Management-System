import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface User {
  id: number;
  username?: string;
  email?: string;
  password: string;
  role: string;
  phoneNumber?: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
}

@Table({
  tableName: 'user',
  timestamps: true,
})
export class Users extends Model<User> implements User {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM("Admin", "User"),
    allowNull: true,
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  otpExpires?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerified!: boolean;
}
