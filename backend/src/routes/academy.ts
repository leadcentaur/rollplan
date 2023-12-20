import express from "express";
import * as AcademyController from "../controllers/academy";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { academyCreationSchema, getAcademyMemberSchema, updateAcademySchema } from "../validation/academys";
import { createAcademyRateLimit } from "../middlewares/rate-limit";
import requiresAuth from "../middlewares/requiresAuth";
import requiresOwner from "../middlewares/requiresOwner";
import { academyLogoUpload } from "../middlewares/image-upload";

const   router = express.Router();

router.post("/create", createAcademyRateLimit, validateRequestSchema(academyCreationSchema), AcademyController.createAcademy);

// might need to kind of lockdown on this endpoint in the future
router.get("/:id", AcademyController.getAcademyByID)
router.patch("/add/member", AcademyController.addMember);
router.patch("/update/:id", requiresOwner, academyLogoUpload.single("academyLogo"), validateRequestSchema(updateAcademySchema), AcademyController.updateAcademy); 

export default router;