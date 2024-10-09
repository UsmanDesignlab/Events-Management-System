// Import Express and the controller functions
import express from 'express';
import passport from 'passport';
import { googleAuthCallback } from "../google/googleController"

// Create a new router instance
const router = express.Router();

// Route to trigger Google Login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route for Google OAuth callback
router.get('/auth/google/callback', googleAuthCallback);

// Export the router
export default router;
