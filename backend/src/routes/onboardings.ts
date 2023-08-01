import express from "express";
import * as ValidationController from "../controllers/validation/ConflictValidators";

const router = express.Router();

router.post("/customer/validation", ValidationController.customerValidation);
router.post("/member/validation", ValidationController)

export default router;