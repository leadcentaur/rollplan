import express from "express";
import * as CustomerValidationController from "../controllers/validation/customer-onboarding";

const router = express.Router();

router.post("/customer/validation", CustomerValidationController.customerValidation);

export default router;