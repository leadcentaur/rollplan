import * as yup from "yup";
import { beltType, userType } from "../../@types/user-types";
import { imageFileSchema } from "../utils/validation";

export const usernameSchema = yup.string()
    .max(20, "Username Must be 20 characters or less")

const emailSchema = yup.string().email();

const passwordSchema = yup.string()
    .matches(/^(?!.* )/)
    .min(6);

export const firstNameSchema =  yup.string()
    .max(100)
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "First name must not contain special characters")

export const lastnameNameSchema =  yup.string()
    .max(100)
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Last name must not contain special characters")

export const numberofStripesSchema = yup.number()
    .max(1)

const beltSchema = yup.mixed<beltType>().oneOf([
    'white','blue','brown','pruple','black'
])

const usertypeSchema = yup.mixed<userType>().oneOf([
    'member','owner'
])

export const academyRefSchema = yup.string()
    .max(24)
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid id")

export const signUpSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
        firstname: firstNameSchema.required(),
        lastname: lastnameNameSchema.required(),
        belt: beltSchema,
        numberOfStripes: numberofStripesSchema
    }),
});

export type SignUpBody = yup.InferType<typeof signUpSchema>["body"];

export const updateUserSchema = yup.object({
    body: yup.object({
        username: usernameSchema,
        firstname: yup.string().max(100),
        lastname: yup.string().max(100),
        about: yup.string().max(160),
        belt: yup.string().max(33),
        numberOfStripes: numberofStripesSchema.max(1)
    }),
    file: imageFileSchema
})

export type UpdateUserBody = yup.InferType<typeof updateUserSchema>["body"];