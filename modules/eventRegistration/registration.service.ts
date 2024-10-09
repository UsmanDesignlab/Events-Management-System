import { where } from "sequelize";
import { Users } from "../User/userModel";
import { Events } from "../eventCreate/eventModel";
import { eventRegistration } from "./registrationModel";


export default  class RegistrationService{


  public static async registrationFindAll(){
    return await eventRegistration.findAll()
  }

  public static async registrationFindOne(id:string){
    return await eventRegistration.findOne({where:{id}})
  }

  public static async registrationUserOne(id:string){
    return await Users.findOne({where:{id}})
  }

  public static async registrationEventOne(id:string){
    return await Events.findOne({where:{id}})
  }

  public static async registrationEvent(id:string){
    return await Events.destroy({where:{id}})
  }

}

