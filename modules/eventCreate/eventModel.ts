import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length } from 'class-validator';

interface Event {
  id?: number;
  eventName?: string;
  description?: string;
  dateEvent?: string;
  location?: string;
  capacity?: number;
  amount?: number;
  userId?:number
}

@Table({
  tableName: 'event',
  timestamps: true,
})
export class Events extends Model<Event> implements Event {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    field: "event_Name",
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  @Length(1, 100) // Limit the length of the event name
  eventName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  @IsOptional() // Make description optional
  description?: string;

  @Column({
    field: 'date_Event',
    type: DataType.DATE,
    allowNull: true,
  })
  @IsDateString() // Ensure it's a valid date
  dateEvent!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @IsInt()
  @IsPositive() // Ensure capacity is a positive integer
  capacity?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @IsInt()
  @IsPositive() // Ensure amount is a positive integer
  amount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  }) 
  userId?: number;
}
