import express from "express";
import {userProfile,changePassword,loginRegister ,userRegister,userLogout,verifyEmail } from "../User/userController";
import {registerValidation} from "../User/validation"


const router = express.Router({ mergeParams: true });

router.post("/register",registerValidation,userRegister)
router.post('/verifyEmail', verifyEmail);
router.post("/logout",userLogout)
router.post("/login",loginRegister)
router.post("/changePassword",changePassword)
router.get("/profile",userProfile)


export default router;
