import * as yup from "yup";
import { academyLocationSchema, academyNameSchema } from "./academys";
import { usernameSchema } from "./users";


export type eventLogType = 'userAdded' 
   | 'userRemoved' 
   | 'calendarEventUpdate'
   | 'calendarEventNew'
   | 'calendarEventDelete'
   | 'beltPromotion'

export const eventTypeSchema = yup.mixed<eventLogType>().oneOf([
    "userAdded",
    "userRemoved",
    "calendarEventUpdate",
    "calendarEventNew",
    "calendarEventDelete",
    "beltPromotion"
], "Invalid type");


export const eventLogSchema = yup.object({
    body: yup.object({
        eventType: yup.string().required(),
        eventTimeStamp: yup.string().required(),
        eventTitle: yup.string().required(),
        eventSubtitle: yup.string().required(),
        eventMetadata: yup.string().required(),
    })
})

export type CollectorEventBody = yup.InferType<typeof eventLogSchema>["body"];