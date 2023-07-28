import * as yup from "yup";
import { beltType, userType } from "@/types/user-types";

export const requiredStringSchema = yup.string().required("Required")

export const usernameSchema = yup.string()
    .max(30, "Maximum of 30 characters")
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
    .matches(/^\w[\w.\-#&\s]*$/, "Academy name cannot be blank or contain special characters")

export const aboutSchema = yup.string()
    .max(320)
    .matches

export const academyLocationSchema = yup.string()
        .max(100)
        .matches(/^[#.0-9a-zA-Z\s,-]+$/, "Location field cannot be blank or contain special characters")
        // .matches(/^[a-zA-z0-9_]*$/, "Only letters, numbers and underscores are allowed")


export const academyOwnerSchema = yup.string()
        .email()
        .max(320)

export const firstNameSchema =  yup.string()
    .max(100)
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "First name must not be blank or contain special characters.")

export const lastnameNameSchema =  yup.string()
    .max(100)
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Last name must not be blank or contain special characters.")

    export const numberofStripesSchema = yup.number()
    .max(1)

export const beltSchema = yup.mixed<beltType>().oneOf([
    'white','blue','brown','purple','black'
])

export const usertypeSchema = yup.mixed<userType>().oneOf([
    'member','owner'
])



//need a sperate function here to update the academyRef field inside of the user object
//
        
// export const academyRefSchema = yup.string()
//     .max(24)
//     .matches(/^[a-f\d]{24}$/i, "Academy reference field must be a valid id")


        