import { RequestHandler } from "express";
import { logEventBody } from "../validation/collector";
import {  }

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

export const createLogEvent: RequestHandler<unknown, unknown, CollectorEventBody, unknown> = async (req, res, next) => {
    
    const { eventType, eventTitle,  eventSubtitle, eventTimeStamp, eventMetadata } = req.body;
    try {
        const new logEvent = 
    } catch (error) {
        next(error);
    }

}