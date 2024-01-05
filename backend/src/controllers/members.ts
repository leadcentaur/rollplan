import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema, mongo, isValidObjectId } from "mongoose";
import AcademyModel from "../models/academy";
import assertIsDefined from "../utils/assertIsDefined";
import { AddMemberBody, MembersQuery} from "../validation/members";
import UserModel from "../models/user";

//localhost:5000/members/academyId?=655e67180a77ae5bd08923c7&page
export const getAcademyMembers: RequestHandler<any, unknown, unknown, MembersQuery> = async (req, res, next) => {

    const academyId = new mongoose.Types.ObjectId(req.query.academyId);
    const page = parseInt(req.query.page || "1");
    const pageSize = 2;    

    try {

        const getAcademyMembersQuery = UserModel.find({academyReferenceId: academyId})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        
        const countDocumentsQuery = UserModel.countDocuments({academyReferenceId: academyId});
        const [members, totalResults] = await Promise.all([getAcademyMembersQuery, countDocumentsQuery]);
        const totalPages = Math.ceil(totalResults / pageSize);

        res.status(200).json({
            members,
            totalPages,
            page,
        });

    } catch (error) {
        next(error)
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
