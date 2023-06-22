import * as yup from "yup";

export const requiredStringSchema = yup.string().required("Required")

export const usernameSchema = yup.string()
    .max(20, "Must be 20 characters or less")
    .matches(/^[a-zA-z0-9_]*$/, "Only letters, numbers and underscores are allowed")

export const emailSchema = yup.string()
    .email("Pleas enter a valid email address")

export const passwordSchema = yup.string()
    .matches(/^(?!.* )/, "Must not contain any white spaces")
    .min(6, "Must be atleast 6 characters long");

export const requiredFileSchema = yup.mixed<FileList>()
    .test(
        "not-empty-file-list",
        "Required",
        value => value instanceof FileList && value.length > 0
    )
    .required();

export const academyNameSchema = yup.string()
    .max(72)
    .matches(/^[a-zA-Z0-9 ]*$/, "Academy name can only contain letters, numbers and spaces.")

export const academyLocationSchema = yup.string()
        .max(100)
        .matches(/^[#.0-9a-zA-Z\s,-]+$/, "Address field cannot contain special characters")
        // .matches(/^[a-zA-z0-9_]*$/, "Only letters, numbers and underscores are allowed")

export const academyOwnerSchema = yup.string()
        .email()
        .max(320)