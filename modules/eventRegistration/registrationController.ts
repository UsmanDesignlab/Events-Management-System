import { Request,Response } from "express";
import { Users } from "../User/userModel";
import { Events } from "../eventCreate/eventModel";
import { eventRegistration } from "./registrationModel";
import RegistrationService from "./registration.service";


export const all = async (req:Request, res:Response) => {
  try {
    const data = await RegistrationService.registrationFindAll();
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await RegistrationService.registrationFindOne(id)
    if(!data){
     return res.status(404).send("Data not found")
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

export const update = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const {eventId,userId,username,payment}=req.body
    const three = await RegistrationService.registrationFindOne(id)
  
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await RegistrationService.registrationEventOne(eventId)
    if(!data){
     return res.status(404).send("Event not found")
    }
    const one = await RegistrationService.registrationUserOne(userId)
    if(!one){
    return res.status(404).send("User not found")
    }
    const two = await eventRegistration.update({eventId,userId,username,payment},{where:{id}})
    if(!two){
    return res.status(404).send("Not Entered Error")
    }
    res.status(200).send("update Data");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const destroy = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const three = await RegistrationService.registrationFindOne(id)
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await RegistrationService.registrationEvent(id)
    if(!data){
     return res.status(404).send("Order not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}