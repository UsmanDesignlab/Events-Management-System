import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface User {
  id?: number;
  eventId?: number;
  userId?: number;
}

@Table({
  tableName: "user_event",
  timestamps: true,
})
export class userEvent extends Model<User> implements User {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
   id?: number;

  @Column({
    field:"user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @Column({
    field:"event_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
    eventId?: number;
 
  }