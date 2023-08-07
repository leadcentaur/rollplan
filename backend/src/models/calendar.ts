
import { InferSchemaType, Schema, model } from "mongoose";

export const eventScehma = new Schema({
    eventName: {
        type: String, 
        required: true,
        unique: true,
    },
    eventDescription: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    academyReferenceId: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Academy",
    }
}, {timestamps: true})

type Event = InferSchemaType<typeof eventScehma>;
export default model<Event>("Event", eventScehma);        