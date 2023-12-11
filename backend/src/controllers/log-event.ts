import { RequestHandler } from "express";
import { logEventBody,  GetLogEventQuery } from "../validation/log-event";
import logEventModel from "../models/log-event";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import logEvent from "../models/log-event";


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

export const getLogEvents: RequestHandler<unknown, unknown, unknown, GetLogEventQuery> = async (req, res, next) => {
    const academyId = req.query.academyId;
    const page = parseInt(req.query.page || "1");

    console.log("Academy Id: " + academyId);
    console.log("Page #: " + page);

    const pageSize = 6;

    try {
        const getLogEventsQuery = logEventModel.find({academyReferenceId: academyId})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        
        const countDocumentsQuery = logEventModel.countDocuments({academyReferenceId: academyId});

        const [logEvents, totalResults] = await Promise.all([getLogEventsQuery, countDocumentsQuery]);
        const totalPages = Math.ceil(totalResults / pageSize);

        console.log("Log events JSON" + logEvents);
        
        res.status(200).json({
            logEvents,
            totalPages,
            pageSize
        });

    }catch (error) {
        next(error);
    }

}
