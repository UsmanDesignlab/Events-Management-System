import Joi from "joi";
import { Request, Response, NextFunction } from "express"


const eventRegistration = Joi.object({
  eventId: Joi.number().required().messages({
    'any.required': 'eventId is required.',
  }),
  // userId: Joi.number().required().messages({
  //   'any.required': 'userId is required.',
  // }),
  username: Joi.string().required().optional().messages({
    'any.required': 'username is required.',
  }),
  payment: Joi.string().required().valid("Paid", "unPaid").messages({
    'any.required': 'Only Paid or unPaid is required',
  }),
});

export function registerValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = eventRegistration.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
