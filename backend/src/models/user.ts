import { InferSchemaType, model, Schema } from "mongoose";
import academy from "./academy";
import { academyScehma } from "./academy";

// we can add a ref field that tells mongoose that
// the given user item belongs to a doucment
// example being author: ref "User"

export const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        sparse: true
    },
    email: { 
        type: String, 
        unique: true, 
        select: true 
    },
    firstname: { type: String },
    lastname: { type: String },
    about: { type: String },
    profilePicUrl: { type: String },
    password: { 
        type: String, 
        select: false 
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true, 
        select: false 
    },
    belt: { 
        type: String, 
        select: true 
    },
    numberOfStripes: {type: Number},
    userType: {
        type: String, 
        required: true
    },
    dateOfLastPromotion: {type: String},
    dateOfLastAttendance: {type: String},
    classAttended: {type: Number},
    academyReferenceId: { 
        type: Schema.Types.ObjectId, 
        ref: "Academy",
    }
}, { timestamps: true });

// userSchema.pre("validate", function (next) {
//     if (!this.email && !this.googleId) {
//         return next(new Error("User must have an email or social provider id"));
//     }
//     next();
// });

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);