
import { InferSchemaType, Schema, model } from "mongoose";
import { number } from "yup";

//
export const eventScehma = new Schema({
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    eventDescription: {
        type: String,
    },
    eventType: {
        type: String,
    },
    numberOfAttendees: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    academyReferenceId: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Academy",
    }
//possibly add back the props
})

type Event = InferSchemaType<typeof eventScehma>;
export default model<Event>("Event", eventScehma);        