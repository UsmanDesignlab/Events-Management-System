import { HasOne, Sequelize } from "sequelize-typescript";
import { Events } from "../eventCreate/eventModel";
import { eventRegistration } from "../eventRegistration/registrationModel";
import { Payment } from "../payment/paymentModel";
import { Users } from "../User/userModel";
import { userEvent } from "../userEvent/userEventModel";
import { Images } from "../fileUpload/imagesModel";
import dotenv from 'dotenv';




dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(process.env.db_NAME as string, process.env.db_USER as string, process.env.db_PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
  models: [Events, Payment, eventRegistration, Users, userEvent, Images]
});
Users.belongsToMany(Events, { through: 'userEvent', foreignKey: "userId" });
Events.belongsToMany(Users, { through: 'userEvent', foreignKey: "eventId" });

Users.hasMany(Events, { foreignKey: "userId" });

Payment.hasOne(Users, { foreignKey: "userId" });
Payment.hasOne(eventRegistration, { foreignKey: "eventRegistrationId" });

Events.hasOne(Users, { foreignKey: "userId" });

eventRegistration.belongsTo(Users,{foreignKey:"userId"}),


Events.hasOne(eventRegistration,{foreignKey:"eventId"})
eventRegistration.belongsTo(Events,{foreignKey:"eventId"})


Images.hasOne(eventRegistration,{foreignKey:"eventRegistrationId"})


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export default sequelize;