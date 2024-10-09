import { Request, Response } from "express";
import { Events } from "../eventCreate/eventModel";
import { eventRegistration } from "./registrationModel";
import { Users } from "../User/userModel";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'htimest@gmail.com', // Your email
    pass: 'cauhagbzxnzontyz', // Your email password
  },
});

// Function to send email
const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: 'htimest@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export const add = async (req: any, res: Response) => {
  try {

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    if (decoded) {
      const { eventId, username, payment } = req.body

      const data = await Events.findOne({
        where: {
          id: eventId
        }
      })
      if (!data) {
        return res.status(404).send("Event not found")
      }
      const one = await Users.findOne({
        where: {
          id: req.user.id
        }
      })
      if (!one) {
        return res.status(404).send("User not found")
      }
      const currentRegistrationsCount = await eventRegistration.count({
        where: { eventId },
      });

      // Check if capacity has been reached
      if (currentRegistrationsCount == data.capacity) {
        return res.status(400).send("Capacity full");
      }

      const existingRegistration = await eventRegistration.findOne({ where: { userId: req.user.id, eventId } });
      if (existingRegistration) {
        return res.status(400).send("User has already registered for an event");
      }
      const two = await eventRegistration.create({
        eventId: eventId,
        userId: req.user.id,
        payment: payment,
        username: username
      })
      if (!two) {
        return res.status(404).send("Not Entered Error")
      }
      res.status(200).send(two);

      if (one.email) {
        const subject = `Welcome to the Registration for an Event , ${two.username}!`;
        const text = `You have successfully registered as an  Event. 
    EventName:  ${data.eventName} 
    EventDescription: ${data.description}
    EventDate: ${data.dateEvent}
    EventAmount:${data.amount}
      `;
        await sendEmail(one.email, subject, text);
      } else {
        console.error('User email is undefined.');
        return res.status(400).json({ message: "User email is not available." });
      }
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

export const allUser = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    let one = await Users.findOne({ where: { id: req.user.id } })
    if (!one) {
      return res.status(404).send("Not Entered Error")
    }

    let event = await eventRegistration.findAll({ where: { userId: req.user.id } })
    if (!event) {
      return res.status(404).send("Not Entered Error")
    }
    res.status(200).send({ one, event });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}