import express from "express";
import {allEvents,oneEvent,addEvent ,updateEvent,deleteEvent } from "../fileUpload/controller";
import { upload } from "./multerMiddleware";


const router = express.Router({ mergeParams: true });

router.get("/",allEvents);
router.get("/:id",oneEvent);
router.post("/",upload.single("image"),addEvent);
router.patch('/:id',upload.single("image"),updateEvent)
router.delete("/:id",deleteEvent)


export default router;