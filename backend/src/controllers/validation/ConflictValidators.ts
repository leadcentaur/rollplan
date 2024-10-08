import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../../models/user";
import AcademyModel from "../../models/academy";
import { CustomerValidationBody, MemberValidationBody } from "../../validation/onboarding";
import { usernameSchema } from "../../validation/users";

export const customerValidation: RequestHandler<unknown, unknown, CustomerValidationBody, unknown> = async (req, res, next) => {
const { email, username, academy_name } = req.body
    try {
        const userEmail = await UserModel.findOne({email: email})
            .collation({locale: "en", strength: 2})
            .exec();
            
        if (userEmail) {
            throw createHttpError(409, "A user with the same email already exists")
        }
        
        const userUsername = await UserModel.findOne({username: username})
            .collation({locale: "en", strength: 2})
            .exec();

        if (userUsername) {
            throw createHttpError(409, "A user with the same username already exists")
        }

        const academyName = await AcademyModel.findOne({academy_name: academy_name})
            .collation({locale: "en", strength: 2})
            .exec();

        if (academyName) {
            throw createHttpError(409, "An academy with the same name already exists in the system. Please contact rollplanbjj@gmail.com or use a new name.");
        }

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}

export const memberValidation: RequestHandler<unknown, unknown, MemberValidationBody, unknown> = async (req, res, next) => {
const { email, username } = req.body
    try {
        const userEmail = await UserModel.findOne({email: email})
            .collation({locale: "en", strength: 2})
            .exec();
            
        if (userEmail) {
            throw createHttpError(409, "A user with the same email already exists. Please login.")
        }
        
        const userUsername = await UserModel.findOne({username: username})
            .collation({locale: "en", strength: 2})
            .exec();

        if (userUsername) {
            throw createHttpError(409, "A user with the same username already exists")
        }

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}