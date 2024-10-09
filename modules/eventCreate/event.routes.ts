import express from "express";
import { allEvents, oneEvent, addEvent, updateEvent, deleteEvent,allProfile } from "./eventController";
import { isAdmin, hasAccess } from "../Middleware/adminController";

const router = express.Router({ mergeParams: true });

router.get("/all",allProfile)
router.get("/", allEvents);
router.get("/:id", oneEvent);
router.post("/", isAdmin, addEvent);
router.patch('/:id', isAdmin, updateEvent)
router.delete("/:id", isAdmin, deleteEvent)

export default router;