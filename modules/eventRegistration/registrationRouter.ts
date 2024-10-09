import express from "express";
import {all,one,update,destroy} from "../eventRegistration/registrationController";
import { registerValidation } from "../eventRegistration/validation";
import {add,allUser} from "../eventRegistration/email"

const router = express.Router({ mergeParams: true });
router.get("/all",allUser)
router.get("/",all);
router.get("/:id",one);
router.post("/",registerValidation,add);
router.patch('/:id',registerValidation,update)
router.delete("/:id",destroy)


export default router;