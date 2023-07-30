import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../../models/user";
import AcademyModel from "../../models/academy";
import { CustomerValidationBody } from "../../validation/onboarding";
import { usernameSchema } from "../../validation/users";

export const customerValidation: RequestHandler<unknown, unknown, CustomerValidationBody, unknown> = async (req, res, next) => {
    const { email, username, academy_name } = req.body
    try {   
            
    } catch (error) {
        next(error);
    }
}