import express from "express";
import * as CalendarController from "../controllers/calendar";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { academyCreationSchema, updateAcademySchema } from "../validation/academys";
import { createAcademyRateLimit } from "../middlewares/rate-limit";
import requiresAuth from "../middlewares/requiresAuth";
import requiresOwner from "../middlewares/requiresOwner";
import { academyLogoUpload } from "../middlewares/image-upload";
import { createCalendarEventSchema } from "../validation/calendar";

const router = express.Router();

router.post("/create-event", validateRequestSchema(createCalendarEventSchema), CalendarController.createCalendarEvent);
router.get("/events/:id", CalendarController.getAcademyEvents); 

export default router;