import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import AcademyModel from "../models/academy";
import assertIsDefined from "../utils/assertIsDefined";
import UserModel from "../models/user";
import { email } from "envalid";
import { AcademyBody } from "../validation/academys";

export const createAcademy: RequestHandler<unknown, unknown, AcademyBody, unknown> = async (req, res, next) => {

    const name = req.body.academy_name;
    const location = req.body.academy_location;
    const owner_email = req.body.academy_owner;

    console.log("Name: " + name + " Location: " + location + " Owner email: " + owner_email);

    try {
     
        if(!name || !location || !owner_email) {
            throw createHttpError(400, "Parameters missing.");
        }

        const existingAcademy = await AcademyModel.findOne({academy_name: name})
            .collation({locale: "en", strength: 2})
            .exec();

        if (existingAcademy) {
            throw createHttpError(409, "An academy with the same name already exists.");
        }

        const owner = await UserModel.findOne({email: owner_email}).exec();
        if (!owner) {
            throw createHttpError(404, "Unable to assign a valid user to this gym.");
        }
        const ownerObject = owner.toObject();
       
        const existingOwner = await AcademyModel.findOne({academy_owner: ownerObject}).exec();
        if (existingOwner) {
            throw createHttpError(404, "This email specified is already an assigned owner, Please use another email");
        }

        const newAcademy = await AcademyModel.create({
            academy_name: name,
            academy_location: location,
            academy_owner: ownerObject,
        });
        
        console.log("New academy created:" + newAcademy);
        res.status(201).json(newAcademy)

    } catch (error) {
        next(error)
    }
}
