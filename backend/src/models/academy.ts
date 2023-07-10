
import { InferSchemaType, Schema, model } from "mongoose";
import { userSchema } from "./user";

export const academyScehma = new Schema({
    academy_name: {
        type: String, 
        required: true,
        unique: true,
    },
    academy_location: {
        type: String
    },
    academyDescription: { type: String },
    academyLogoUrl: { type: String },
    subscriptionStatus: { type: Number },
    academy_owner: {type: [userSchema], required: true},
    members: {type: [userSchema], required: false }
})

type Academy = InferSchemaType<typeof academyScehma>;
export default model<Academy>("Academy", academyScehma);        