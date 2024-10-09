import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../User/userModel';

interface CustomRequest extends Request {
  user?: any;
}

export async function isLoggedIn(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.cookies.token) {
    return res.status(401).send("You are not logged in");
  }
  try {
    const data: any = jwt.verify(req.cookies.token, "secret");
    req.user = data; 
    // This sets the user data, including role
    
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}



export function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).send("Forbidden: Admins only");
  }
  next();
}

export function isUser(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'User') {
    return res.status(403).send("Forbidden: Users only");
  }
  next();
}


export function hasAccess(req: CustomRequest, res: Response, next: NextFunction) {
  const allowedRoles = ['Admin', 'User'];

  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).send("Forbidden: Access denied");
  }

  next();
}


