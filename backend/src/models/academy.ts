
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
    academyPhone: { type: String}, 
    academyDescription: { type: String },
    academyLogoUrl: { type: String },
    subscriptionStatus: { type: Number },
    academyEmail: { type: String },
    
    //any reference to the users should be made via objectid ref
    academy_owner: {type: Schema.Types.ObjectId, required: true},
    members: {type: [{type: Schema.Types.ObjectId}], required: false, unique: true }
})

type Academy = InferSchemaType<typeof academyScehma>;
export default model<Academy>("Academy", academyScehma);        