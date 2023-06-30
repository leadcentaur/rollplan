import * as yup from "yup";
import { beltType, userType } from "../../@types/user-types";
import { imageFileSchema } from "../utils/validation";

export const usernameSchema = yup.string()
    .max(20, "Username Must be 20 characters or less")
    .matches(/^[a-zA-z0-9_]*$/).required("Invalid username.")

const emailSchema = yup.string().email();

const passwordSchema = yup.string()
    .matches(/^(?!.* )/)
    .min(6);

const beltSchema = yup.mixed<beltType>().oneOf([
    'white','blue','brown','pruple','black'
])

export const signUpSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
    }),
});

export type SignUpBody = yup.InferType<typeof signUpSchema>["body"];

export const updateUserSchema = yup.object({
    body: yup.object({
        username: usernameSchema,
        displayName: yup.string().max(20),
        firstname: yup.string().max(40),
        lastname: yup.string().max(80),
        about: yup.string().max(160),
        belt: yup.string().max(33),
    }),
    file: imageFileSchema
})

export type UpdateUserBody = yup.InferType<typeof updateUserSchema>["body"];