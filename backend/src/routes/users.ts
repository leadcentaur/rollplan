import express from "express";
import passport from "passport";
import * as UsersController from "../controllers/users";
import { profilePicUpload } from "../middlewares/image-upload";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { setAcademyReferenceIdSchema, userSignUpSchema, updateUserSchema, requestVerificationCodeSchema } from "../validation/users";
import env from "../env";
import setSessionReturnTo from "../middlewares/setSessionReturnTo";

const router = express.Router();

router.get("/me", requiresAuth, UsersController.getAuthenticatedUser);

router.get("/profile/:username", UsersController.getUserByUsername);

router.post("/signup", validateRequestSchema(userSignUpSchema), UsersController.signUp);
router.post("/verification-code", validateRequestSchema(requestVerificationCodeSchema), UsersController.requestEmailVerificationCode);

router.post("/login", passport.authenticate("local"), (req, res) => res.status(200).json(req.user));

router.get("/login/google", setSessionReturnTo, passport.authenticate("google"));

router.get("/oauth2/redirect/google", passport.authenticate("google", {
    successReturnToOrRedirect: env.WEBSITE_URL,
    keepSessionInfo: true,
}))

router.post("/logout", UsersController.logOut);

router.patch("/me", requiresAuth, profilePicUpload.single("profilePic"), validateRequestSchema(updateUserSchema), UsersController.updateUser);

//need to lock this down somehow
router.patch("/setRefId", validateRequestSchema(setAcademyReferenceIdSchema), UsersController.setAcademyReferenceId);

export default router;