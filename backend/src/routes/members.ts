import express from "express";
import * as AcademyController from "../controllers/academy";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { getAcademyMemberSchema } from "../validation/academys";
import requiresAuth from "../middlewares/requiresAuth";

const router = express.Router();

router.get("/", validateRequestSchema(getAcademyMemberSchema), AcademyController.getAcademyMembers);

export default router;