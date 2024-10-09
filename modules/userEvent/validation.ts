import Joi from "joi";
import {Request,Response,NextFunction} from "express"

const userEvent = Joi.object({
  eventId: Joi.number().required().messages({
    'any.required': 'eventId is required.',
  }),
  userId: Joi.number().required().messages({
    'any.required': 'userId is required.',
  }),
});

export function registerValidation (req: Request, res: Response, next: NextFunction) {
  const { error } = userEvent.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); 
  }
  next(); 
}
