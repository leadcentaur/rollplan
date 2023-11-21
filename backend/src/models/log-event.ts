
import { InferSchemaType, Schema, model } from "mongoose";
import { number } from "yup";

// eventType: yup.string().required(),
// eventTimeStamp: yup.string().required(),
// eventTitle: yup.string().required(),
// eventSubtitle: yup.string().required(),
// eventMetadata: yup.string().required(),

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
    }
})

type logEvent = InferSchemaType<typeof logEventSchema>;
export default model<logEvent>("logEvent", logEventSchema);        