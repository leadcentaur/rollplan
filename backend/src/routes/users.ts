import express from "express";
import * as UsersController from "../controllers/users";
import passport from "passport";
import requiresAuth from "../middlewares/requiresAuth";
import { signUpSchema, updateUserSchema } from "../validation/users";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { profilePicUpload } from "../middlewares/image-upload";

const router = express.Router();

router.get("/me", requiresAuth, UsersController.getAuthenticatedUser);
router.get("/profile/:username", UsersController.getUserByUsername);

router.post("/signup", validateRequestSchema(signUpSchema), UsersController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => res.status(200).json(req.user));
router.post("/logout", UsersController.logOut);

router.patch("/me", requiresAuth, profilePicUpload.single("profilePic"), validateRequestSchema(updateUserSchema), UsersController.updateUser);

export default router;