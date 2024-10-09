import Joi from "joi";
import {Request,Response,NextFunction} from "express"

const registers = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required.',
  }),
  email: Joi.string().email({ minDomainSegments: 1, tlds: { allow: ["com"] } }).required().messages({
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(4).max(6).required().messages({
    'string.min': 'Password must be at least 4 characters long.',
    'string.max': 'Password must be at most 6 characters long.',
    'any.required': 'Password is required.',
  }),
  role: Joi.string().required().valid("Admin","User").messages({
    'any.required': 'Role is required.',
    'any.only': 'Role must be one of the following: Admin, User.',
  }),
   phoneNumber: Joi.string().messages({
    'string.base': ' Phone Number is Number.',
  }),
});

export function registerValidation (req: Request, res: Response, next: NextFunction) {
  const { error } = registers.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); 
  }
  next(); 
}

