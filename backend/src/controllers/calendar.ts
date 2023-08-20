import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema, mongo, isValidObjectId } from "mongoose";
import EventModel from "../models/event";
import TempEventModel from "../models/temp-event";
import assertIsDefined from "../utils/assertIsDefined";
import { CreateEventBody, CreateTempEventBody } from "../validation/calendar";
import sharp from "sharp";
import env from "../env";
import moment from "moment";

export const createCalendarEvent: RequestHandler<unknown, unknown, CreateEventBody, unknown> = async (req, res, next) => {
    try {
        const { title, start, end, numberOfAtendees, eventType, eventDescription, academyReferenceId } = req.body;
        
        const newEvent = await EventModel.create({
            title, start, end, eventType, numberOfAtendees, eventDescription, academyReferenceId
        });

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

interface AcademyEventsParams {
    id?: string,
}

interface AcademyEventsQuery {
    start?: string,
    end?: string,
}

export const getAcademyTempEvents: RequestHandler<AcademyEventsParams, unknown, CreateEventBody, AcademyEventsQuery> = async (req, res, next) => {
    try {

        const events = await TempEventModel.find({
            start: {$gte: moment(req.query.start).toDate()}, 
            end: {$lte: moment(req.query.end).toDate()},
        });

        console.log("Returned temp events: " + JSON.stringify(events));

        res.status(200).json(events);   
    } catch (error) {
        next(error)
    }
}

export const createTempEvent: RequestHandler<unknown, unknown, CreateTempEventBody, unknown> = async (req, res, next) => {
    try {
        const { title, start, end } = req.body;
        const newTempEvent = await TempEventModel.create({title, start, end});

        console.log("New temp event created:" + newTempEvent);
        res.status(201).json(newTempEvent)

    } catch (error) {
        next(error)
    }
}

// export const deleteCalendarEvent: RequestHandler<unknown, unknown, DeleteEventBody, unknown> = async (req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// }