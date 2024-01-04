import express from "express";
import * as MemberController from "../controllers/members";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { MembersSchema } from "../validation/members";
import requiresAuth from "../middlewares/requiresAuth";

const router = express.Router();

router.get("/", validateRequestSchema(MembersSchema), MemberController.getAcademyMembers);

export default router;