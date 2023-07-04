import express from "express";
import * as AcademyController from "../controllers/academy";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { academyCreationSchema } from "../validation/academys";

const router = express.Router();

router.post("/create", validateRequestSchema(academyCreationSchema), AcademyController.createAcademy);

// might need to kind of lockdown on this endpoint in the future
router.get("/:id", AcademyController.getAcademyByID)

export default router;