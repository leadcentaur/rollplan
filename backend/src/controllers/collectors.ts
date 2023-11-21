import { RequestHandler } from "express";
import { CollectorEventBody } from "../validation/log-event";


export const createCollectorEvent: RequestHandler<unknown, unknown, CollectorEventBody, unknown> = async (req, res, next) => {
    const eventType = req.body.eventType;
const event
}