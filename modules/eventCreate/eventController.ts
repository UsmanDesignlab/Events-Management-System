import { Request, Response } from "express";
import { Events } from "./eventModel";
import { Users } from "../User/userModel";
import EventService from "./event.service";
import jwt from 'jsonwebtoken';

// Fetch all events
export const allEvents = async (req: Request, res: Response) => {
  try {
    const data = await EventService.findAllEvents();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

// Fetch a single event by ID
export const oneEvent = async (req: Request, res: Response) => {
  try {
    const data = await EventService.findOneEvent(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

// Add a new event
export const addEvent = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    if (decoded) {

      let { eventName, description, dateEvent, location, capacity, amount ,userId} = req.body;

      const data = await Events.create({
        eventName:eventName,
        description:description,
        dateEvent:dateEvent,
        location:location,
        capacity:capacity,
        amount:amount,
        userId:req.user.id
      });

      res.status(201).json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventName, description, dateEvent, location, capacity, amount} = req.body;
    const { id } = req.params;

    const eventToUpdate = await EventService.findOneEvent(id);
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updated = await Events.update(
      { eventName, description, dateEvent, location, capacity, amount},
      { where: { id } }
    );

    if (!updated[0]) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await EventService.findOneEvent(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found" });
    }

    const deleted = await Events.destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

// Fetch user profile by email
export const allProfile = async (req:any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }
    const data: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = data
    const user = await Users.findOne({ where: { id:req.user.id} });

    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
     
    // Fetch events created by the admin
    const events = await Events.findAll({ where: {userId:req.user.id}});

    // Return the admin's information along with the events
    res.status(200).json({ user, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};