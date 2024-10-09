import { Request, Response } from "express";
import { Users } from "../User/userModel";
import { Events } from "../eventCreate/eventModel";
import { Payment } from "./paymentModel";
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Q43OQC7BBupGqYnI5kFXc7vNCC8j4Nx05m6K9nwf6uiO4abJstSo1M4lCELsMUQgOehBxJ9EsXKZqccgpQ2nhdQ001NZQvGXm");


export const checkOut = async (req: Request, res: Response) => {
  const { eventRegistrationId, userId, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "EVENT",
          },
          unit_amount: amount * 100, // Convert dollars to cents
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: "http://localhost:4009/success",
      cancel_url: "http://localhost:4009/cancel"
    });
    const data = await Events.findOne({
      where: {
        id: eventRegistrationId
      }
    })
    if (!data) {
      return res.status(404).send("Event not found")
    }
    const one = await Users.findOne({
      where: {
        id: userId
      }
    })
    if (!one) {
      return res.status(404).send("User not found")
    }

    const payment = await Payment.create({
      eventRegistrationId,
      userId,
      amount,
    });
    if (payment.amount !== data.amount) {
      return res.status(404).send("amount not same")
    }
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error during checkout session creation:', error);
    return res.status(500).json({ error: 'Error during checkout' });
  }
};