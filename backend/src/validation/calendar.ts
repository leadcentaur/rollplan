import * as yup from "yup";

export const eventTitleSchema = yup.string()
    .max(30)
    .required()

export const eventDescriptionSchema = yup.string()
    .max(120)

export const startDateSchema = yup.string()

export const endDateSchema = yup.string()

export const academyReferenceIdSchema = yup.string()
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid user id")
    .max(24)

export const createCalendarEventSchema = yup.object({
    body: yup.object({
        eventName: eventTitleSchema,
        eventDescription: eventDescriptionSchema,
        startDate: startDateSchema,
        endDate: endDateSchema,
        academyReferenceId: academyReferenceIdSchema,
    })
})

export type CreateEventBody = yup.InferType<typeof createCalendarEventSchema>["body"];

export const createTempEventBodySchema = yup.object({
    body: yup.object({
        title: yup.string(),
        start: yup.string(),
        end: yup.string(),
    })
})

export type CreateTempEventBody = yup.InferType<typeof createTempEventBodySchema>["body"];





