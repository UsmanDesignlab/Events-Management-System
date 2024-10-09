import { Events } from '../eventCreate/eventModel'
import { Users } from "../User/userModel";

export default class UserService{

  public static async findOneUser(email:string){
    return await Users.findOne({where:{email}});
 }

 
}

