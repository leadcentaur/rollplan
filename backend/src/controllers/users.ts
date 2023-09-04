import { RequestHandler } from "express";
import UserModel from "../models/user";
import AcademyModel from "../models/academy";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import assertIsDefined from "../utils/assertIsDefined";
import { SetAcademyReferenceIdBody, UserSignUpBody, UpdateUserBody, RequestVerificationCodeBody, ResetPasswordBody } from "../validation/users";
import EmailVerificationToken from "../models/email-verification-token";
import PasswordResetToken from "../models/password-reset-token";
import sharp from "sharp";
import env from "../env";
import { number } from "yup";
import academy from "../models/academy";
import { use } from "passport";
import { beltType } from "../../@types/user-types";
import crypto from "crypto"
import * as Email from "../utils/email"
import user from "../models/user";
import { destroyAllActiveSessionsForUser } from "../utils/auth";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.user;
    try {
                assertIsDefined(authenticatedUser)
       
                console.log("Authenticated user is defined: " + authenticatedUser._id);
                const user = await UserModel.findById(authenticatedUser._id).select("+email").exec();
                res.status(200).json(user);


    } catch (error) {
        next(error);
    }
}

export const getUserByUsername: RequestHandler = async (req, res, next) => {
    
    try {   
            console.log(req.session.id);
            const user = await UserModel.findOne({ username: req.params.username }).exec();
            if (!user) { throw createHttpError(404, "User not found"); }

            res.status(200).json(user)
      
    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, UserSignUpBody, unknown> = async (req, res, next) => {
    //you can rename the password via the below syntax


    const { username, email, password: passwordRaw, firstname, lastname, belt, numberOfStripes, userType, verificationCode} = req.body;

    try {
            const existingUsername = await UserModel.findOne({ username })
            .collation({locale: "en", strength: 2})
            .exec();

            if (existingUsername) {
                throw createHttpError(409, "Username already taken");
            }

            const emailVerificationToken = await EmailVerificationToken.findOne({email, verificationCode}).exec();
            if (!emailVerificationToken) {
                throw createHttpError(400, "Verification code in correct or expired.")
            } else {
                await emailVerificationToken.deleteOne();
            }

            const existingEmail = await UserModel.findOne({email})
                .exec()
            
            if (existingEmail) {
                throw createHttpError(409, "Email already taken");
            }

            const passwordHashed = await bcrypt.hash(passwordRaw, 10);

            const result = await UserModel.create({
                username,
                email,
                firstname,
                lastname,
                password: passwordHashed,

                /*
                    The only time a user should ever be granted 
                    owner type is if there subscription is active

                */

                userType: userType,
                belt: belt,
                numberOfStripes: numberOfStripes as number,
            });

            const newUser = result.toObject();
            delete newUser.password;

            req.logIn(newUser, error => {
                if (error) throw error;
                res.status(201).json(newUser);
            });
        
    } catch (error) {
        next(error)
    }
}

export const requestEmailVerificationCode: RequestHandler<unknown, unknown, RequestVerificationCodeBody, unknown> = async (req, res, next) => {

    const { email } = req.body;

    try {
        const existingEmail = await UserModel.findOne({email})
            .collation({locale: "en", strength: 2})
            .exec()

        if (existingEmail) {
            throw createHttpError(409, "A user with the same email address already exists. Please login instead.");
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        await EmailVerificationToken.create({email, verificationCode});

        await Email.sendVerificationCode(email, verificationCode);
        res.sendStatus(200);

    } catch (error) {
        next(error);
    }
}


export const requestResetPasswordCode: RequestHandler<unknown, unknown, RequestVerificationCodeBody, unknown> = async (req, res, next) => {

    const { email } = req.body;
    try {
        
        const user = await UserModel.findOne({email})
            .collation({locale: "en", strength: 2})
            .exec()

        if (!user) {
            throw createHttpError(404, "A user with this email doesn't exist. Please sign up instead.")
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        await PasswordResetToken.create({email, verificationCode});

        await Email.sendPasswordResetCode(email, verificationCode);

        res.sendStatus(200);

    } catch (error) {
        next(error);
    }
}

export const resetPassword: RequestHandler<unknown, unknown, ResetPasswordBody, unknown> = async (req, res, next) => {

    const { email, password: newPasswordRaw, verificationCode} = req.body

    try {
        const exitingUser = await UserModel.findOne({email}).select("+email")
            .collation({locale: "en", })
            .exec();

        if (!exitingUser) {
            throw createHttpError(404, "User not found");
        }

        const passwordResetToken = await PasswordResetToken.findOne({email, verificationCode}).exec();
        if (!passwordResetToken) {
            throw createHttpError(400, "Verification code incorrect or expired.");
        } else {
            await passwordResetToken.deleteOne();
        }

        await destroyAllActiveSessionsForUser(exitingUser?.id.toString());

        const newPasswordHashed = await bcrypt.hash(newPasswordRaw, 10);
        exitingUser.password = newPasswordHashed;

        await exitingUser.save();

        const user = exitingUser.toObject();

        delete user.password;

        req.logIn(user, error => {
            if (error) throw error;
            res.status(200).json(user);
        });
    } catch (error) {
        next(error)
    }
}


export const updateUser: RequestHandler<unknown, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
    const { username, about, firstname, lastname, belt } = req.body;
    const profilePic = req.file;
    const authenticatedUser = req.user;

    try {
        assertIsDefined(authenticatedUser);

        if (username) {
            const existingUsername = await UserModel.findOne({ username })
                .collation({ locale: "en", strength: 2 })
                .exec();


            if (existingUsername) {
                throw createHttpError(409, "Username already taken");
            }
        }

        let profilePicDestinationPath: string | undefined = undefined;

        if (profilePic) {
            profilePicDestinationPath = "/src/uploads/profile-pictures/" + authenticatedUser._id + ".png";

            await sharp(profilePic.buffer)
                .resize(500, 500, { withoutEnlargement: true })
                .toFile("./" + profilePicDestinationPath);

        }

        const updatedUser = await UserModel.findByIdAndUpdate(authenticatedUser._id, {
            $set: {
                ...(username && {username}),
                ...(firstname && {firstname}),
                ...(belt && {belt}),
                ...(lastname && {lastname}),
                ...(about && { about }),
                ...(profilePic && { profilePicUrl: env.SERVER_URL + profilePicDestinationPath + "?lastupdated=" + Date.now() }),
            }
        }, { new: true }).exec();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}


export const setAcademyReferenceId: RequestHandler<unknown, unknown, SetAcademyReferenceIdBody, unknown> = async (req, res, next) => {
    const { userId, academyReferenceId } = req.body;
    try {

        const user = await UserModel.findById(userId).exec();
        if (!user) {
            throw createHttpError(404, "Unable to find user with Id")
        }

        const academy = await AcademyModel.findById(academyReferenceId).exec();
        if (!academy) {
            throw createHttpError(404, "Unable to find academy with Id")
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            $set: {
                ...(academyReferenceId && { academyReferenceId }),
            }
        }, { new: true }).exec();

        res.status(200).json(updatedUser);

    } catch (error) {
        next(error);
    }
}

interface UpdateUserByUsernameParamsProps {
    username: string,
}

interface UpdateUserByUsernameBody {
    username?: string,
    firstname?: string,
    lastname?: string,
    belt?: string,
    numberOfStripes?: number,
    profilePicUrl?: string,
    about?: string,
}

export const updateUserByUsername: RequestHandler<UpdateUserByUsernameParamsProps, unknown, UpdateUserByUsernameBody, unknown> = async (req, res, next) => {

    const { username, firstname, lastname, belt, numberOfStripes, about } = req.body
    const profilePic = req.file;

    try {
        const user = await UserModel.findOne({username: username})
            .collation({ locale: "en", strength: 2 })
            .exec();

        if (!user) {
            throw createHttpError(404, "User not found")
        }

        const updatedUser = UserModel.findByIdAndUpdate(user.id, {
            $set: {
                ...(username && { username }),
                ...(belt && { belt }),
                ...(firstname && { firstname}),
                ...(lastname && {lastname}),
                ...(numberOfStripes && {numberOfStripes}),
            }
        })

    } catch (error) {
        next(error);
    }
}

export const logOut: RequestHandler = (req, res) => {
    req.logOut(error => {
        if (error) throw error;
        res.sendStatus(200);
    })
}