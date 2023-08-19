import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema, mongo, isValidObjectId } from "mongoose";
import EventModel from "../models/event";
import assertIsDefined from "../utils/assertIsDefined";
import { CreateEventBody } from "../validation/calendar";
import sharp from "sharp";
import env from "../env";

export const createCalendarEvent: RequestHandler<unknown, unknown, CreateEventBody, unknown> = async (req, res, next) => {
    try {
        const { eventName, startDate, endDate, eventDescription, academyReferenceId } = req.body;
        const newEvent = await EventModel.create({eventName, eventDescription, startDate, endDate, academyReferenceId});

        console.log("New academy created:" + newEvent);
        res.status(201).json(newEvent)

    } catch (error) {
        next(error)
    }
}

export const getAcademyEventsById: RequestHandler = async (req, res, next) => {
    try {
        const academy = await EventModel.find({academyReferenceId: req.params.id}).exec();
        if (!academy) { throw createHttpError(404, "Academy not found"); }
        res.status(200).json(academy);
    } catch (error) {
        next(error);
    }
}

// export const deleteCalendarEvent: RequestHandler<unknown, unknown, DeleteEventBody, unknown> = async (req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// }