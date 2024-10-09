import express from "express";
import {all,one,update,destroy} from "../payment/paymentController";
import {checkOut} from "../payment/paymentStripe"
import { registerValidation } from "../payment/validation";

const router = express.Router({ mergeParams: true });

router.get("/",all);
router.get("/:id",one);
router.patch('/:id',registerValidation,update)
router.delete("/:id",destroy)
router.post("/checkOut",registerValidation,checkOut)


export default router;