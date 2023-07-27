import { usernameSchema } from "@/utils/validation";
import * as yup from "yup";

const validationSchema = yup.object({
    username: usernameSchema.required("Required"),
})

type OnboardingInput = yup.InferType<typeof validationSchema>;