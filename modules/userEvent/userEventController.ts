import { Request,Response } from "express";
import { Users } from "../User/userModel";
import { Events } from "../eventCreate/eventModel";
import { userEvent } from "./userEventModel";


export const all = async (req:Request, res:Response) => {
  try {
    const data = await userEvent.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await userEvent.findOne({where:{
      id
    }})
    if(!data){
     return res.status(404).send("Data not found")
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

export const add = async(req:Request,res:Response)=>{
  try {
    const {eventId,userId}=req.body
    const data = await Events.findOne({where:{
        id:eventId
    }})
    if(!data){
     return res.status(404).send("Event not found")
    }
    const one = await Users.findOne({where:{
      id:userId
    }})
    if(!one){
    return res.status(404).send("User not found")
    }
    const two = await userEvent.create({
        eventId:req.body.eventId,
        userId:req.body.userId
      })
    if(!two){
    return res.status(404).send("Not Entered Error")
    }
    res.status(200).send(two);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const update = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const {eventId,userId}=req.body

     const three = await userEvent.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await Events.findOne({where:{
        id:eventId
    }})
    if(!data){
     return res.status(404).send("Order not found")
    }
    const one = await Users.findOne({where:{
      id:userId
    }})
    if(!one){
    return res.status(404).send("Product not found")
    }
    const two = await userEvent.update({ userId,eventId},{where:{id}})
    if(!two){
    return res.status(404).send("Not Entered Error")
    }
    res.status(200).send(two);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const destroy = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
     const three = await userEvent.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await userEvent.destroy({where:{
        id
    }})
    if(!data){
     return res.status(404).send("User not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}