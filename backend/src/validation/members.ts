import * as yup from "yup";
import { userIdSchema } from "./users";
import { imageFileSchema } from "../utils/validation";
import { userSchema } from "../models/user";
import { academyIdSchema } from "./academys";

export const addMemberSchema = yup.object({
    body: yup.object({
        memberId: userIdSchema.required(),
        academyId: academyIdSchema.required(),
    })
})

export type AddMemberBody = yup.InferType<typeof addMemberSchema>["body"];

export const MembersSchema = yup.object({
    query: yup.object({
        academyId: academyIdSchema.required(),
        page: yup.string(),
    })
})
export type MembersQuery = yup.InferType<typeof MembersSchema>["query"];
