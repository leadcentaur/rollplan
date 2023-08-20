import { InferSchemaType, Schema, model } from "mongoose";

export const tempEventSchema = new Schema({
    start: {
        type: Date, 
    },
    end: {
        type: Date,
    },
    title: {
        type: String
    }
})

type TempEvent = InferSchemaType<typeof tempEventSchema>;
export default model<TempEvent>("TempEvent", tempEventSchema);   