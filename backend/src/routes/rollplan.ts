import express from "express";
import * as RollplanController from "../controllers/rollplan";

const router = express.Router();

router.get("/", RollplanController.loadAcademyInfo);

export default router;