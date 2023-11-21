
import { InferSchemaType, Schema, model } from "mongoose";
import { number } from "yup";

export const eventScehma = new Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    isRecurring: {
        type: Boolean,
    },
    type: {
        type: String,
        required: true,
    },
    numberOfAttendees: {
        type: String,
    },
    registeredMembers: {
        type: [{type: Schema.Types.ObjectId}], 
        required: false, 
        sparse: true 
    },
    registerCount :{
        type: Number,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    referenceId: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Academy",
    }
})

type Event = InferSchemaType<typeof eventScehma>;
export default model<Event>("Event", eventScehma);        