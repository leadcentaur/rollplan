import express from "express";
import * as LogEventController from "../controllers/log-event";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { logEventSchema } from "../validation/log-event";

const router = express.Router();

router.post("/create", LogEventController.createLogEvent, validateRequestSchema(logEventSchema), LogEventController.createLogEvent);
router.get("/:academyReferenceId", LogEventController.getLogEvents);

export default router;