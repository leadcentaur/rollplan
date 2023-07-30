import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../../models/user";
import AcademyModel from "../../models/academy";
import { CustomerValidationBody } from "../../validation/onboarding";
import { usernameSchema } from "../../validation/users";

export const customerValidation: RequestHandler<unknown, unknown, CustomerValidationBody, unknown> = async (req, res, next) => {
const { email, username, academy_name } = req.body
    try {
        const userEmail = await UserModel.findOne({email: email}).exec();
        if (userEmail) {
            throw createHttpError(409, "A user with the same email already exists")
        }
        
        const userUsername = await UserModel.findOne({username: username})
        if (userUsername) {
            throw createHttpError(409, "A user with the same username already exists")
        }

        const academyName = await AcademyModel.findOne({academy_name: academy_name})
            .collation({locale: "en", strength: 2})
            .exec();

        if (academyName) {
            throw createHttpError(409, "An academy with the same name already exists");
        }

        res.status(200).json({"status":"ok"})
    } catch (error) {
        next(error);
    }
}