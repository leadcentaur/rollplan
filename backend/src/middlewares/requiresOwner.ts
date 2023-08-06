import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import AcademyModel from "../models/academy";

const requiresOwner: RequestHandler = async (req, res, next) => {

    const requestingUserId = req.user?._id;
    const academyId = req.params.id;

    if (requestingUserId && academyId) {

        const user = await UserModel.findById(requestingUserId).exec();
        const academy = await AcademyModel.findById(academyId).exec();

        if (user?.userType == "owner" && academy?.academy_owner == user.id) {
            next();
        } else {
            next(createHttpError(401, "User not authorized"));
        }
   
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
}

export default requiresOwner;