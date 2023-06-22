import * as yup from "yup";

export const usernameSchema = yup.string()
    .max(20, "Username Must be 20 characters or less")
    .matches(/^[a-zA-z0-9_]*$/).required("Invalid username.")

const emailSchema = yup.string().email();

const passwordSchema = yup.string()
    .matches(/^(?!.* )/)
    .min(6);

export const signUpSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
    }),
});

export type SignUpBody = yup.InferType<typeof signUpSchema>["body"];