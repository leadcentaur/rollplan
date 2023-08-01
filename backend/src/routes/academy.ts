import express from "express";
import * as AcademyController from "../controllers/academy";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { academyCreationSchema } from "../validation/academys";
import { createAcademyRateLimit } from "../middlewares/rate-limit";
import requiresAuth from "../middlewares/requiresAuth";

const router = express.Router();

router.post("/create", createAcademyRateLimit, validateRequestSchema(academyCreationSchema), AcademyController.createAcademy);

// might need to kind of lockdown on this endpoint in the future
router.get("/:id", AcademyController.getAcademyByID)
router.patch("/add/member", AcademyController.addMember);
router.get("/:academyId/members", requiresAuth, AcademyController.getAcademyMembers);

export default router;