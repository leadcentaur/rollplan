
import { InferSchemaType, Schema, model } from "mongoose";
import { number } from "yup";

export const logEventSchema = new Schema({
    eventType: {
        type: String, 
        required: true,
    },
    eventTitle: {
        type: String, 
        required: true,
    },
    eventSubtitle: {
        type: String, 
        required: true,
    },
    eventMetadata: {
        type: String, 
        required: true,
    },
    academyReferenceId: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Academy",
    }
})

type logEvent = InferSchemaType<typeof logEventSchema>;
export default model<logEvent>("logEvent", logEventSchema);        