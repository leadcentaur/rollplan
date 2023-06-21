import { RequestHandler } from "express";
import UserModel from "../models/users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const loadAcademyInfo: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.user;
    console.log("sdbhjhbsdfjhbfsdjhbsfdjhbfshjbsdbhjfsdjhb")
    console.log(authenticatedUser);
    try {
     
        if (!authenticatedUser) throw createHttpError(401);

    } catch(error) {
        next(error);
    }
}
