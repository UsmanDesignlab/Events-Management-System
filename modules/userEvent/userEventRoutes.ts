import express from "express";
import {all,one,add,update,destroy} from "../userEvent/userEventController";
import { registerValidation } from "../userEvent/validation";

const router = express.Router({ mergeParams: true });

router.get("/",all);
router.get("/:id",one);
router.post("/",registerValidation,add);
router.patch('/:id',update)
router.delete("/:id",destroy)


export default router;