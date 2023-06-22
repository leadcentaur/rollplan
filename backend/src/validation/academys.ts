import * as yup from "yup";

const academyNameSchema = yup.string()
    .max(72)
    .matches(/^[a-zA-Z0-9 ]*$/,);

const academyLocationSchema = yup.string()
    .max(100)
    .matches(/^[#.0-9a-zA-Z\s,-]+$/)

const academyOwnerSchema = yup.string()
    .email()
    .max(320);

export const academyCreationSchema = yup.object({
    body: yup.object({
        academy_name: academyNameSchema.required(),
        academy_location: academyLocationSchema.required(),
        academy_owner: academyOwnerSchema.required(),
    }),
});

export type AcademyBody = yup.InferType<typeof academyCreationSchema>["body"];





