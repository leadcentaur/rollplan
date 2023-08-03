import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema, isValidObjectId } from "mongoose";
import AcademyModel from "../models/academy";
import assertIsDefined from "../utils/assertIsDefined";
import UserModel from "../models/user";
import { email } from "envalid";
import { AcademyBody, GetAcademyMembersBody, UpdateAcademyBody } from "../validation/academys";
import { AddMemberBody } from "../validation/academys";
import sharp from "sharp";
import env from "../env";

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
            throw createHttpError(409, "An academy with the same name already exists in the system. Please contact support or use a new name.");
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

        console.log("backedend params: " + JSON.stringify(req.params));

        const academy = await AcademyModel.findById(req.params.id).exec();
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
    const academyReferenceId = req.body.academyId;
    const memberId = new mongoose.Types.ObjectId(req.body.memberId);

    try {
        
        const updatedUser = await UserModel.findByIdAndUpdate(memberId, {
            $set: {
                ...(academyReferenceId && { academyReferenceId }),
            }
        }, { new: true }).exec();

        if (!updatedUser) {
            throw createHttpError(404, "Failed to set academy reference Id")
        }

        const updatedMembers = await AcademyModel.findByIdAndUpdate(academyReferenceId, {
            $addToSet: {'members': memberId}}).exec();
        
        if (!updatedMembers) {
            throw createHttpError(404, "Failed to add member to academy")
        }

        res.status(200).json(updatedMembers);

    } catch (error) {
        next(error);
    }
}

interface UpdateAcademyUrlParams {
    id: string
}

export const updateAcademy: RequestHandler<UpdateAcademyUrlParams, unknown, UpdateAcademyBody, unknown> = async (req, res, next) => {
    const { academy_name, academy_location, academyEmail, acadmeyDescription } = req.body;
    
    const academyLogo = req.file;
    const academyId = req.params.id;

    try {

        if (!isValidObjectId(academyId)) {
            throw createHttpError(404, "Academy not found");
        }
        
        
        const existingAcademy = await AcademyModel.findById({ academyId })
            .collation({ locale: "en", strength: 2 })
            .exec();
        console.log("Academy found: " + existingAcademy);

        if (!existingAcademy) {
            throw createHttpError(404, "Academy not found");
        }

        let academyLogoDestinationPath: string | undefined = undefined;

        if (academyLogo) {
            academyLogoDestinationPath = "/src/uploads/academy-logos/" + academyId + ".png";

            await sharp(academyLogo.buffer)
                .resize(500, 500, { withoutEnlargement: true })
                .toFile("./" + academyLogoDestinationPath);

        }

        const updatedAcademy = await AcademyModel.findByIdAndUpdate(existingAcademy?.id, {
            $set: {
                ...(academy_name && {academy_name}),
                ...(academyEmail && {academyEmail}),
                ...(academy_location && {academy_location}),
                ...(acadmeyDescription && { acadmeyDescription }),
                ...(academyLogo && { academyLogoUrl: env.SERVER_URL + academyLogoDestinationPath + "?lastupdated=" + Date.now() }),
            }
        }, { new: true }).exec();

        res.status(200).json(updatedAcademy);
    } catch (error) {
        next(error);
    }
}
