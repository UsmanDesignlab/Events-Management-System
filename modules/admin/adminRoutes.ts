import express from 'express';
import { isLoggedIn, isAdmin, isUser } from '../Middleware/adminController';

const router = express.Router();

router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
  res.send({ message: 'Hello, Admin!' });
});


router.get('/user', isLoggedIn, isUser, (req, res) => {
  res.send({ message: 'Hello, User!' });
});


router.get('/open', (req, res) => {
  res.send({ message: 'This is an open route.' });
});

export default router;
