import * as yup from "yup";
import { userIdSchema } from "./users";


const academyNameSchema = yup.string()
    .max(72)
    .matches(/^\w[\w.\-#&\s]*$/)

const academyLocationSchema = yup.string()
    .max(100)
    .matches(/^[#.0-9a-zA-Z\s,-]+$/)

const academyOwnerSchema = yup.string()
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid id")
    .max(24)

const academyIdSchema = yup.string()
    .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid user id")
    .max(24)


export const academyCreationSchema = yup.object({
    body: yup.object({
        academy_name: academyNameSchema.required(),
        academy_location: academyLocationSchema.required(),
        academy_owner: academyOwnerSchema.required(),
    }),
});

export type AcademyBody = yup.InferType<typeof academyCreationSchema>["body"];

export const addMemberSchema = yup.object({
    body: yup.object({
        memberId: userIdSchema.required(),
        academyId: academyIdSchema.required(),
    })
})

export type AddMemberBody = yup.InferType<typeof addMemberSchema>["body"];

export const getAcademyMembersSchema = yup.object({
    body: yup.object({
        academyId: academyIdSchema.required(),
    })
})

export type GetAcademyMembersBody = yup.InferType<typeof getAcademyMembersSchema>["body"];



