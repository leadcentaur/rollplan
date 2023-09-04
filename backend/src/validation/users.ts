import * as yup from "yup";
import { beltType, userType } from "../../@types/user-types";
import { imageFileSchema } from "../utils/validation";
import { email } from "envalid";

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
    .max(5)

export const beltSchema = yup.mixed<beltType>().oneOf([
    'white','blue','brown','purple','black'
], "Invalid type")

export const usertypeSchema = yup.mixed<userType>().oneOf([
    'member','owner'
], "Invalid type")

export const aboutSchema = yup.string()
    .max(320)

export const academyRefSchema = yup.string()
    .max(24)
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid id")

export const userIdSchema = yup.string()
    .max(24)
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid id")


export const userSignUpSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
        firstname: firstNameSchema.required(),
        lastname: lastnameNameSchema.required(),
        userType: usertypeSchema.required(),
        belt: beltSchema,
        numberOfStripes: numberofStripesSchema,
        verificationCode: yup.string().required(),
    }),
});

export type UserSignUpBody = yup.InferType<typeof userSignUpSchema>["body"];

export const updateUserSchema = yup.object({
    body: yup.object({
        username: usernameSchema,
        firstname: yup.string().max(100),
        lastname: yup.string().max(100),
        about: yup.string().max(320),
        belt: beltSchema,
        numberOfStripes: numberofStripesSchema.max(1),
    }),
    file: imageFileSchema
})
export type UpdateUserBody = yup.InferType<typeof updateUserSchema>["body"];

export const updateUserByUsernameSchema = yup.object({
    body: yup.object({
        username: usernameSchema,
        firstname: firstNameSchema,
        lastname: lastnameNameSchema,
        belt: beltSchema,
        about: aboutSchema,
        numberOfStripes: numberofStripesSchema,
    })
})
export type UpdateUserByUsernameBody = yup.InferType<typeof updateUserByUsernameSchema>["body"];


export const setAcademyReferenceIdSchema = yup.object({
    body: yup.object({
        userId: userIdSchema.required(),
        academyReferenceId: academyRefSchema.required(),
    })
})
export type SetAcademyReferenceIdBody = yup.InferType<typeof setAcademyReferenceIdSchema>["body"];

export const requestVerificationCodeSchema = yup.object({
    body: yup.object({
        email: emailSchema.required(),
    })
});

export type RequestVerificationCodeBody = yup.InferType<typeof requestVerificationCodeSchema>["body"];

export const resetPasswordSchema = yup.object({
    body: yup.object({
        email: emailSchema.required(),
        password: passwordSchema.required(),
        verificationCode: yup.string().required()
    })
});

export type ResetPasswordBody = yup.InferType<typeof resetPasswordSchema>["body"];