import { Events } from "./eventModel";
import { Users } from "../User/userModel";

export default class EventService{
  public static async findAllEvents(){
    return await Events.findAll({});
  }

  public static async findOneEvent(id:string){
    return await Events.findOne({where:{id}});
 }

 public static async findOneUser(id:string){
  return await Users.findOne({where:{id}});
}
public static async EventDestroy(id:string){
  return await Events.destroy({where:{id}});
}


}