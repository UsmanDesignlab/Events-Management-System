import express from 'express';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import passport from 'passport';
import sequelize from './modules/database';
import userEvent from './modules/userEvent/userEventRoutes';
import Events from './modules/eventCreate/event.routes';
import Registration from './modules/eventRegistration/registrationRouter';
import Payment from './modules/payment/paymentRoute';
import Users from './modules/User/userRoutes';
import Admin from './modules/admin/adminRoutes';
import { isLoggedIn, isAdmin, isUser, hasAccess } from './modules/Middleware/adminController';
import googleAuthRoutes from "./modules/google/googleRoutes"
import Images from "./modules/fileUpload/fileRoutes"


dotenv.config({ path: './config.env' });

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many attempts. Please wait for one hour.',
});

const app = express();

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Apply rate limiter to all API routes
app.use('/api', limiter);

// Apply correct role-based routes
app.use('/', googleAuthRoutes);
app.use('/api', Users);
app.use('/api', isLoggedIn, Admin);
app.use('/api/userEvent', isLoggedIn, hasAccess, userEvent);
app.use('/api/image', isLoggedIn, hasAccess, Images);
app.use('/api/event', isLoggedIn, Events);
app.use('/api/eventRegistration', isLoggedIn, hasAccess, Registration);
app.use('/api/payment', isLoggedIn, hasAccess, Payment);

// Open route for testing
app.get('/', (req, res) => {
  res.send('App is Running');
});

sequelize.sync({ force: false });
console.log('All models were synchronized successfully.');

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
