import express from "express";
import * as CalendarController from "../controllers/calendar";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { academyCreationSchema, updateAcademySchema } from "../validation/academys";
import { createAcademyRateLimit } from "../middlewares/rate-limit";
import requiresAuth from "../middlewares/requiresAuth";
import requiresOwner from "../middlewares/requiresOwner";
import { academyLogoUpload } from "../middlewares/image-upload";
import { createCalendarEventSchema, deleteCalendarEventSchema, registerToCalendarEventSchema, updateCalendarEventBodySchema } from "../validation/calendar";

const router = express.Router();

router.post("/create-event", validateRequestSchema(createCalendarEventSchema), CalendarController.createCalendarEvent);
router.post("/events/notify-members/:id", CalendarController.notifyMembersOnEventUpdate);
router.post("/register/:eventId/:userId", validateRequestSchema(registerToCalendarEventSchema), CalendarController.registerToCalendarEvent);
router.post("/un-register/:eventId/:userId", validateRequestSchema(registerToCalendarEventSchema), CalendarController.unregisterFromCalendarEvent);
router.post("/delete-event/:id", validateRequestSchema(deleteCalendarEventSchema), CalendarController.deleteCalendarEvent);
router.patch("/update-event/:id", validateRequestSchema(updateCalendarEventBodySchema), CalendarController.updateCalendarEvent);
router.get("/events/:id", CalendarController.getAcademyEvents);
router.get("/registered-events", requiresAuth, CalendarController.getRegisteredEventsForUser);

export default router;