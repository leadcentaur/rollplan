import * as yup from "yup";
import { academyIdSchema, academyLocationSchema, academyNameSchema } from "./academys";
import { usernameSchema } from "./users";
import { eventLogType } from "../../@types/user-types";


export const eventTypeSchema = yup.mixed<eventLogType>().oneOf([
    "userAdded",
    "userRemoved",
    "calendarEventUpdate",
    "calendarEventNew",
    "calendarEventDelete",
    "beltPromotion"
], "Invalid type");


export const logEventSchema = yup.object({
    body: yup.object({
        eventType: yup.string().required(),
        eventTimeStamp: yup.string().required(),
        eventTitle: yup.string().required(),
        eventSubtitle: yup.string().required(),
        eventMetadata: yup.string().required(),
        academyReferenceId: academyIdSchema.required(),
    })
})

export type logEventBody = yup.InferType<typeof logEventSchema>["body"];