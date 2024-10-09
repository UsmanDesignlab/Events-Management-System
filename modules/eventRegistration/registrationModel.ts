import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface Registration {
  id?: number;
  username?: string;
  eventId?: number;
  userId?: number;
  payment?: string;
}

@Table({
  tableName: "event_registration",
  timestamps: true,
})
export class eventRegistration extends Model<Registration> implements Registration {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username?: string;

  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @Column({
    field: "event_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventId?: number;


  @Column({
    type: DataType.ENUM("Paid", "unPaid"),
    allowNull: true,
  })
  payment!: string;
}