import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema } from "mongoose";
import AcademyModel from "../models/academy";
import assertIsDefined from "../utils/assertIsDefined";
import UserModel from "../models/user";
import { email } from "envalid";
import { AcademyBody, GetAcademyMembersBody } from "../validation/academys";
import { AddMemberBody } from "../validation/academys";

export const createAcademy: RequestHandler<unknown, unknown, AcademyBody, unknown> = async (req, res, next) => {

    const name = req.body.academy_name;
    const location = req.body.academy_location;
    const owner_id = req.body.academy_owner;

    console.log("Name: " + name + " Location: " + location + " Owner id: " + owner_id);

    try {
     
        if(!name || !location || !owner_id) {
            throw createHttpError(400, "Parameters missing.");
        }

        const existingAcademy = await AcademyModel.findOne({academy_name: name})
            .collation({locale: "en", strength: 2})
            .exec();

        if (existingAcademy) {
            throw createHttpError(409, "An academy with the same name already exists.");
        }

        const owner = await UserModel.findById(owner_id).exec();
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

export const getAcademyByID: RequestHandler = async (req, res, next) => {
    try {
        const academy = await AcademyModel.findById(req.params.id);
        if (!academy) { throw createHttpError(404, "Academy not found"); }
        res.status(200).json(academy);
    } catch (error) {
        next(error);
    }
}

export const getAcademyMembers: RequestHandler = async (req, res, next) => {

    const academyId = new mongoose.Types.ObjectId(req.params.academyId);
    try {
        const members = await UserModel.find({academyReferenceId: academyId}).exec();
        if (!members) {
            throw createHttpError(404, "Failed to fetch members")
        }
        console.log("members list: " + members);

        res.status(200).json(members);
    } catch (error) {
        next(error);
    }
}

export const addMember: RequestHandler<unknown, unknown, AddMemberBody, unknown> = async (req, res, next) => {
    const academyId = req.body.academyId;
    const memberId = new mongoose.Types.ObjectId(req.body.memberId);

    try {
        // will need to a check here to ensure added user is of type member.
        const updateMembers = await AcademyModel.findByIdAndUpdate(academyId, 
            {$addToSet: {'members': memberId}}).exec();

        console.log(updateMembers); 

        if (!updateMembers) {
            throw createHttpError(404, "Failed add member to academy")
        }

        res.status(200).json(updateMembers);

    } catch (error) {
        next(error);
    }
}
