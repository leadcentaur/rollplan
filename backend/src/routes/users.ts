import express from "express";
import * as UsersController from "../controllers/users";
import passport from "passport";
import requiresAuth from "../middlewares/requiresAuth";
import { signUpSchema } from "../validation/users";
import validateRequestSchema from "../middlewares/validateRequestSchema";

const router = express.Router();

router.get("/me", requiresAuth, UsersController.getAuthenticatedUser);
router.post("/signup", validateRequestSchema(signUpSchema), UsersController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => res.status(200).json(req.user));
router.post("/logout", UsersController.logOut);

export default router;