
import { InferSchemaType, Schema, model } from "mongoose";
import { userSchema } from "./user";

export const eventSchema = new Schema({
    eventName: {
        type: String, 
        required: true,
        unique: true,
    },
    eventDate: {
        type: String
    },
    eventStartTime: {
        type: String
    },
    eventEndTime: {
        type: String
    },
    eventDescription: {
        type: String,
    },
    academyLogoUrl: { type: String },
    subscriptionStatus: { type: Number },
    academy_owner: {type: [userSchema], required: true},
    members: {type: [userSchema], required: false }
})

type Academy = InferSchemaType<typeof academyScehma>;
export default model<Academy>("Academy", academyScehma);        