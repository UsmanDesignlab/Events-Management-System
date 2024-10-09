import { Request, Response } from "express";
import { eventRegistration } from "../eventRegistration/registrationModel";
import { Images } from "./imagesModel";


export const allEvents = async (req: Request, res: Response) => {
  try {
    const data = await Images.findAll({})
    if (!data) {
      return res.status(404).send("Event not found");
    }
    res.status(200).json(data);
  }
  catch (err) { 
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const oneEvent = async (req: Request, res: Response) => {
  try {
    const data = await Images.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!data) {
      return res.status(404).send("Event not found");
    }
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const addEvent = async (req: Request, res: Response, imagePath:any) => {
  try {
    let { eventRegistrationId, image, description } = req.body;
    if (req.file) {
      imagePath  = req.file.path; // Save the uploaded file path
    }
    const admin = await eventRegistration.findOne({
      where: {
        id: eventRegistrationId
      }
    });
    if (!admin) {
      return res.status(404).send("user not found");
    }

    const data = await Images.create({
      eventRegistrationId: eventRegistrationId,
      image: imagePath,
      description: description
    });

    if (!data) {
      return res.status(404).send("Event not Added");
    }
    res.status(200).json(data);
    console.log(req.file)
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}


export const updateEvent = async (req: Request, res: Response,imagePath:any) => {
  try {
    let { image, description, eventRegistrationId } = req.body;
    if (req.file) {
      imagePath  = req.file.path; // Save the uploaded file path
    }
    const { id } = req.params;
    const categoryToUpdate = await Images.findOne({
      where: { id }
    });
    if (!categoryToUpdate) {
      return res.status(404).send(" not found");
    }
    const categoryToUpdates = await eventRegistration.findOne({
      where: { id }
    });
    if (!categoryToUpdates) {
      return res.status(404).send("eventRegister not found");
    }

    const updated = await Images.update(
      { image:imagePath, description, eventRegistrationId },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).send("Failed to update product");
    }
    res.status(200).send("Product updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the category");
  }
};



export const deleteEvent = async (req: Request, res: Response) => {
  try {
    let { id } = req.params
    const one = await Images.findOne({
      where: {
        id
      }
    });

    if (!one) {
      return res.status(404).send("Event not Found");
    }
    const found = await Images.destroy({
      where: {
        id
      }
    });

    if (!found) {
      return res.status(404).send("Data not Found");
    }
    res.status(200).json("Event Destroy");
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}