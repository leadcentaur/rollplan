import express from "express";
import * as CustomerValidationController from "../controllers/validation/customerConflictValidator";

const router = express.Router();

router.post("/customer/validation", CustomerValidationController.customerValidation);

export default router;