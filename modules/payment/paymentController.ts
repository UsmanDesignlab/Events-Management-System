import { Request,Response } from "express";
import { Users } from "../User/userModel";
import { eventRegistration } from "../eventRegistration/registrationModel";
import { Payment } from "./paymentModel";
import Stripe from 'stripe';



const stripe = new Stripe("sk_test_51Q43OQC7BBupGqYnI5kFXc7vNCC8j4Nx05m6K9nwf6uiO4abJstSo1M4lCELsMUQgOehBxJ9EsXKZqccgpQ2nhdQ001NZQvGXm");


export const all = async (req:Request, res:Response) => {
  try {
    const data = await Payment.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await Payment.findOne({where:{
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


export const update = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const {eventRegistrationId,userId,amount}=req.body

     const three = await Payment.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await eventRegistration.findOne({where:{
        id:eventRegistrationId
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
    const two = await Payment.update({eventRegistrationId,userId,amount},{where:{id}})
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
     const three = await Payment.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await Payment.destroy({where:{
        id
    }})
    if(!data){
     return res.status(404).send("Order not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

