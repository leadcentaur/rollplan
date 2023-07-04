import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import assertIsDefined from "../utils/assertIsDefined";
import { SignUpBody, UpdateUserBody } from "../validation/users";
import sharp from "sharp";
import env from "../env";
import { number } from "yup";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.user;
    try {
     
        assertIsDefined(authenticatedUser);

        const user = await UserModel.findById(authenticatedUser._id).select("+email").exec();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

export const getUserByUsername: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username }).exec();
        if (!user) { throw createHttpError(404, "User not found"); }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    //you can rename the password via the below syntax
    const { username, email, password: passwordRaw, firstname, lastname, belt, numberOfStripes} = req.body;

    try {
            const existingUsername = await UserModel.findOne({ username })
            .collation({locale: "en", strength: 2})
            .exec();

            if (existingUsername) {
                throw createHttpError(409, "Username already taken");
            }

            const passwordHashed = await bcrypt.hash(passwordRaw, 10);

            const result = await UserModel.create({
                username,
                email,
                firstname,
                lastname,
                password: passwordHashed,
                userType: "owner",
                belt: belt || "white",
                numberOfStripes: numberOfStripes || 1
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

export const updateUser: RequestHandler<unknown, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
    const { username, about } = req.body;
    const profilePic = req.file;
    const authenticatedUser = req.user;
    console.log(profilePic);

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
                ...(username && { username }),
                ...(about && { about }),
                ...(profilePic && { profilePicUrl: env.SERVER_URL + profilePicDestinationPath + "?lastupdated=" + Date.now() }),
            }
        }, { new: true }).exec();

        res.status(200).json(updatedUser);
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