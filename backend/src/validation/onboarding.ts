import * as yup from "yup";
import { academyLocationSchema, academyNameSchema } from "./academys";
import { usernameSchema } from "./users";


export const customerSignUpValidationSchema = yup.object({
    body: yup.object({
        academy_name: academyNameSchema.required(),
        username: usernameSchema.required(),
        email: yup.string().email(),
    }),
});

export type CustomerValidationBody = yup.InferType<typeof customerSignUpValidationSchema>["body"];

export const memberSignUpValidationSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: yup.string().email(),
    }),
});

export type MemberValidationBody = yup.InferType<typeof memberSignUpValidationSchema>["body"];


