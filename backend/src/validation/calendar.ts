import * as yup from "yup";
import { eventType } from "../../@types/user-types";

export const eventTitleSchema = yup.string()
    .max(30)

export const eventDescriptionSchema = yup.string()
    .max(120)

export const startDateSchema = yup.string()

export const endDateSchema = yup.string()

export const academyReferenceIdSchema = yup.string()
    .matches(/^[a-f\d]{24}$/i, "Invalid reference Id")
    .max(24)

export const mongooseObjectIdSchema = yup.string()
    .matches(/^[a-f\d]{24}$/i, "Id provided is not a valid ID")
    .max(24)

export const eventTypeSchema = yup.mixed<eventType>().oneOf([
    "BJJ Gi",
    "BJJ No-Gi",
    "BJJ Gi Fundamentals",
    "BJJ No-Gi Fundamentals",
    "BJJ Gi (Adult)",
    "BJJ No-Gi (Adult)",
    "BJJ Gi (Youth)",
    "BJJ No-Gi (Youth)",
    "BJJ Gi Advanced (Adult)",
    "BJJ Gi Advanced (Youth)",
    "BJJ No-Gi Advanced (Adult)",
    "BJJ No-gi Advanced (Youth)",
    "Open mat Gi",
    "Open mat No-Gi",
    "Open mat (Gi/No-Gi)",
    "Seminar",
    "Other"
], "Invalid type");

export const numberOfAtendeesSchema = yup.number()

export const createCalendarEventSchema = yup.object({
    body: yup.object({
        title: eventTitleSchema.required(),
        description: eventDescriptionSchema.required(),
        type: eventTypeSchema.required(),
        start: startDateSchema.required(),
        end: endDateSchema.required(),
        referenceId: academyReferenceIdSchema.required()
    })
})

export type CreateEventBody = yup.InferType<typeof createCalendarEventSchema>["body"];

export const deleteCalendarEventSchema = yup.object({
    params: yup.object({
        id: mongooseObjectIdSchema.required()
    })
})
export type DeleteEventParams = yup.InferType<typeof deleteCalendarEventSchema>["params"];


export const updateCalendarEventParamsSchema = yup.object({
    params: yup.object({
        id: mongooseObjectIdSchema.required(),
    })
})
export type UpdateCalendarEventParams = yup.InferType<typeof updateCalendarEventParamsSchema>["params"];

export const updateCalendarEventBodySchema = yup.object({
    body: yup.object({
       title: eventTitleSchema,
       description: eventDescriptionSchema,
       type: eventTypeSchema,
       start: startDateSchema,
       end: endDateSchema,
    })
})
export type UpdateCalendarEventBody = yup.InferType<typeof updateCalendarEventBodySchema>["body"];





