import { RequestHandler } from "express";
import { logEventBody } from "../validation/log-event";
import logEventModel from "../models/log-event";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// eventType: yup.string().required(),
// eventTimeStamp: yup.string().required(),
// eventTitle: yup.string().required(),
// eventSubtitle: yup.string().required(),
// eventMetadata: yup.string().required(),

// export const getAcademyMembers: RequestHandler = async (req, res, next) => {

//     const academyId = new mongoose.Types.ObjectId(req.params.academyId);
//     try {
//         const members = await UserModel.find({academyReferenceId: academyId}).exec();
//         if (!members) {
//             throw createHttpError(404, "Failed to fetch members")
//         }
//         console.log("members list: " + members);
//         res.status(200).json(members);
//     } catch (error) {
//         next(error);
//     }
// }

export const createLogEvent: RequestHandler<unknown, unknown, logEventBody, unknown> = async (req, res, next) => {

    const { eventType, eventTitle,  eventSubtitle, eventTimeStamp, eventMetadata, academyReferenceId } = req.body;
    try {
        const newLogEvent = await logEventModel.create({eventType, eventTitle, eventSubtitle, eventMetadata, academyReferenceId});
        if (!newLogEvent) {
            throw createHttpError(404, "Failed to create log event");
        }
        res.status(201).json(newLogEvent);
    } catch (error) {
        next(error);
    }
}

export const getLogEvents: RequestHandler = async (req, res, next) => {
    try {
        const academyRef = new mongoose.Types.ObjectId(req.params.academyReferenceId);
        try {
            const log_events = await logEventModel.find({academyReferenceId: academyRef}).exec();
            if (!log_events) {
                throw createHttpError(404, "Failed to fetch members")
            }
            console.log("members list: " + log_events);
            
            res.status(200).json(log_events);
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error)
    }
}