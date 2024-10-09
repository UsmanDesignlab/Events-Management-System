import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface Registration {
  id?: number;
  eventRegistrationId?: number;
  image?: string;
  description?: string;
}

@Table({
  tableName: "images",
  timestamps: true,
})
export class Images extends Model<Registration> implements Registration {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    field: "event-registration-id",
    type: DataType.STRING,
    allowNull: false,
  })
  eventRegistrationId?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: "default.png",
  })
  image?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description?: string;
}