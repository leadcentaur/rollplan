import * as yup from "yup";

export const academyCreationSchema = yup.object({
    academy_name: yup.string().required().max(72).matches(/^[a-z0-9]+(?:[ _.-][a-z0-9]+)*$/, "Only letters, numbers and underscores are allowed"),
    academy_location: yup.string().required().max(100),
    academy_owner: yup.string().email().max(320),
})

export type AcademyBody = yup.InferType<typeof academyCreationSchema>;

// export const createBlogPostSchema = yup.object({
//     body: blogPostBodySchema,
//     file: imageFileSchema.required("Featured image required"),
// });