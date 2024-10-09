import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Users } from '../User/userModel';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '116570637383-ncru94e1r59gcnrpr5tvo8ungkga035q.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4008/auth/google/callback',
      scope: 'profile email'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('Email not provided'));

        let user = await Users.findOne({ where: { email } });
        if (user) {
          // User exists, return the user object
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google Authentication Callback
export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'secret',  // Replace with your JWT secret
      { expiresIn: '4h' }
    );

    // Set token as a cookie and send it as a response
    res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true in production
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  })(req, res, next);
};