import { Request, Response, NextFunction } from "express"
import { Users } from "../User/userModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateOTP } from "./otp";
import { sendEmail } from "./email";



export const userRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, phoneNumber } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and its expiration time (10 minutes)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create user with hashed password and OTP
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      otp,
      otpExpires,
      isVerified: false,
    } as Users);

    // Send OTP to user's email
    await sendEmail(email, 'Verify Your Email', `Your OTP is: ${otp}`);

    res.status(201).json({
      message: 'User registered. Please check your email for OTP verification.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || user.otpExpires! < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark the user as verified and clear OTP fields
    user.isVerified = true;
    user.otp || undefined || null;
    user.otpExpires || undefined || null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret', { expiresIn: '4h' });

    res.status(200).json({ message: 'Email verified successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const loginRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const one = await Users.findOne({ where: { email: email } });

    if (!one) {
      return res.sendStatus(404).json({ message: "User not found" });
    }

    // Compare passwords using bcrypt
    bcrypt.compare(password, one.password, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      // If passwords match
      if (result) {
        const token = jwt.sign({ id: one.id, role: one.role }, "secret", { expiresIn: "4h" });
        console.log(one.id);
        console.log(one.role);

        // Set cookies and send success response
        res.cookie("token", token);
        return res.status(200).json({ message: "Login successful", token });
      }
      //  else {
      //   // If passwords don't match, send 401 response
      //   return res.status(401).json({ message: "Invalid credentials" });
      // }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const userLogout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    return res.status(200).json("Register Logout");
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await Users.findAll({ where: { email: email } })
    if (!user.length) {
      return res.send("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await Users.update({ password: hash }, { where: { email: email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}

export const user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await Users.findAll({ where: { email: email } })
    if (!user) {
      return res.status(403).json("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await Users.update({ password: hash }, { where: { email: email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}


export const userProfile = async (req: Request, res: Response) => {
  try {
    const data: any = jwt.verify(req.cookies.token, "secret");
    const userId = data.userId;
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error occurred while fetching user profile" });
  }
};