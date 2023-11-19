import { RequestHandler } from "express";
import { CollectorEventBody } from "../validation/collector";


export const createCollectorEvent: RequestHandler<unknown, unknown, CollectorEventBody, unknown> = async (req, res, next) => {
    const eventType = req.body.eventType;
}