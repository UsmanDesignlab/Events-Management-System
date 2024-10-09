import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface payments {
  id?: number;
  userId?: number;
  eventRegistrationId?: number;
  amount?:number;
}

@Table({
  tableName: 'payment',
  timestamps: true,
})
export class Payment extends Model<payments> implements payments {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
   id?: number;

  @Column({
    field:"user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @Column({
    field:"event_Registration_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
    eventRegistrationId?: number;

    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
      amount?: number;

  }