import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Mongoose, Schema, mongo, isValidObjectId } from "mongoose";
import EventModel from "../models/event";
import assertIsDefined from "../utils/assertIsDefined";
import { CreateEventBody, DeleteEventParams, RegisterToCalendarEventParams, UpdateCalendarEventBody, UpdateCalendarEventParams} from "../validation/calendar";
import sharp from "sharp";
import env from "../env";
import moment from "moment";
import event from "../models/event";
import * as Email from "../utils/email"


export const createCalendarEvent: RequestHandler<unknown, unknown, CreateEventBody, unknown> = async (req, res, next) => {
    try {
        const { title, start, end, type, description, location, referenceId } = req.body;

        const startDate = new Date(start);
        const endDate = new Date(end);

        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
        if (differenceInDays > 7) {
            throw createHttpError(400, "An event cannot last longer than 7 days.")
        }

        if (endDate < startDate) {
            throw createHttpError(400, "An event cannot end before it begins");
        } 

        // Look at maybe adding one second to the
        // event duration as from a users perspective this might. interesting.

        if (start == end) {

                throw createHttpError(400, "Event must have a duration. Ensure the event has a start and end date that differ.");
        } 
        
        const newEvent = await EventModel.create({
            title, start, end, description, location, referenceId, type
        });

        console.log("New academy created:" + newEvent);
        res.status(201).json(newEvent)
        
    } catch (error) {
        next(error)
    }
}



export const deleteCalendarEvent: RequestHandler<DeleteEventParams, unknown, unknown, unknown> = async (req, res, next) => {
    try {

        const eventId = req.params.id;

        const fetchedEvent = await EventModel.findById(eventId).exec();
        if (!fetchedEvent) {
            throw createHttpError(404, "Event not found");
        }

        const eventToDelete = await fetchedEvent.deleteOne()
        console.log("Event deleted successfully: " + JSON.stringify(eventToDelete));
        res.status(200).json({"status":"ok"})

    } catch (error) {
        next(error)        
    }
}

export const getAcademyEventsById: RequestHandler = async (req, res, next) => {
    try {
        const academy = await EventModel.find({referenceId: req.params.id}).exec();
        if (!academy) { throw createHttpError(404, "Academy not found"); }
        res.status(200).json(academy);
    } catch (error) {
        next(error);
    }
}

interface AcademyEventsParams {
    id: string,
}

interface AcademyEventsQuery {
    start: string,
    end: string,
}

export const registerToCalendarEvent: RequestHandler<RegisterToCalendarEventParams, unknown, unknown, unknown> = async (req, res, next) => {
    const { eventId, userId } = req.params;
    try {
        
        const event = await EventModel.findByIdAndUpdate(eventId, {
            $addToSet: {registeredMembers: userId},
        }).exec();
        
        if (!event) {
            throw createHttpError(404, "There was an error registering for event.");
        }

        event.registeredMembers.forEach(function (value) {
            if (value.toString() == userId) {
                throw createHttpError(404, "User already registered for this event.");
            }
        })

        const incRegisterCount = await EventModel.findByIdAndUpdate(eventId, {
            $inc: {registerCount:  1}
        }, {new: true}).exec();
        
        if (!incRegisterCount) {
            console.error("Failed to increment the register account on event: " + eventId);
        }

        res.status(200).json(incRegisterCount);   

    } catch (error) {
        next(error);
    }
}

export const unregisterFromCalendarEvent: RequestHandler<RegisterToCalendarEventParams, unknown, unknown, unknown> = async (req, res, next) => {
    
    let existingUser = false;
    const { eventId, userId } = req.params;


    try {
        const event = await EventModel.findByIdAndUpdate(eventId, {
            $pull: {registeredMembers: userId},
        }).exec();

         
        if (!event) {
            throw createHttpError(404, "There was an error un-registering from the event.");
        }

        event.registeredMembers.forEach(function (value) {
            if (value.toString() == userId) {
                existingUser = true;
            }
        })

        if (!existingUser) {
            throw createHttpError(400, "Error user not registered for this event");
        }

        const incRegisterCount = await EventModel.findByIdAndUpdate(eventId, {
            $inc: {registerCount: -1}
        },{new: true}).exec();
        
        if (!incRegisterCount) {
            console.error("Failed to decrement the register account on event: " + eventId);
        }

        res.status(200).json(incRegisterCount);  

    } catch (error) {
        next(error)
    }
}

//neeed to add better validation herese
export const getAcademyEvents: RequestHandler<AcademyEventsParams, unknown, CreateEventBody, AcademyEventsQuery> = async (req, res, next) => {
    try {

        const events = await EventModel.find({
            referenceId: req.params.id,
            start: {$gte: moment(req.query.start).toDate()}, 
            end: {$lte: moment(req.query.end).toDate()},
        });

        res.status(200).json(events);   
    } catch (error) {
        next(error)
    }
}

export const notifyMembersOnEventUpdate:  RequestHandler = async (req, res, next) => {

    const eventId = req.params.id

    try {
        const event = await EventModel.findById(eventId).exec();
        if (!event) {
            throw createHttpError(404, "Could not find event");
        }
        event.registeredMembers.forEach(function (value) {
            Email.
        });
        res.status(200).json({"ok":"ok"})

    } catch (error) {
        next(error);
    }
}

export const updateCalendarEvent: RequestHandler<UpdateCalendarEventParams, unknown,UpdateCalendarEventBody, unknown> = async (req, res, next) => {
    const { title, type, description, location, start, end } = req.body
    const id = req.params.id;

    try {

        if (!isValidObjectId(id)) {
            throw createHttpError(404, "Event not found");
        }

        const existingEvent = await EventModel.findById(id).exec();
        if (!existingEvent) {
            throw createHttpError(404, "Event not found");
        }

        const prevStart = existingEvent.start
        const prevEnd = existingEvent.end;

        if (start && !end) {
            if (new Date(start) > prevEnd || new Date(start) == prevEnd) {
                throw createHttpError(400, "An event cannot start after it has ended.please try again.")
            }
        }

        if (end && !start) {
            if (new Date(end) < prevStart || new Date(end) == prevStart) {
                throw createHttpError(400, "An event cannot end before it has started. please try again")
            }
        }

        if (end && start) {
            if (end < start) {
                throw createHttpError(400, "An event cannot end before it has started.please try again")
            }
            if (end == start) {
                throw createHttpError(400, "An event cannot end before it has started.please try again")
            }
        }

        const updatedEvent = await EventModel.findByIdAndUpdate(existingEvent.id, {
            $set: {
                ...(title && {title}),
                ...(type && {type}),
                ...(location && {location}),
                ...(description && {description}),
                ...(start && {start}),
                ...(end && {end}),
            }   
        }, { new: true}).exec();

        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }

}   