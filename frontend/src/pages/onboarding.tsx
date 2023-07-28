import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { firstNameSchema, lastnameNameSchema, usernameSchema } from "@/utils/validation";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as UsersApi from "@/network/api/users";;
import { useEffect } from "react";
import FormInputField from "@/components/site/form/SiteFormInputField";

const validationSchema = yup.object({
    username: usernameSchema.required("Required"),
    firstname: firstNameSchema.required("Required"),
    lastname: lastnameNameSchema.required("Required"),
});

type OnboardingInput = yup.InferType<typeof validationSchema>;

export default function OnboardingPage() {
    const { user, mutateUser } = useAuthenticatedUser();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OnboardingInput>({
        resolver: yupResolver(validationSchema),
    });

    async function onSubmit({ username, firstname, lastname }: OnboardingInput) {
        try {
            const updatedUser = await UsersApi.updateUser({ username, displayName: username, firstname: firstname, lastname: lastname });
            mutateUser(updatedUser);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    useEffect(() => {
        if (user?.username) {
            const returnTo = router.query.returnTo?.toString();
            router.push(returnTo || "/app");
        }
    }, [user, router]);

    return (
        <div className="rounded-md dark:border-strokedark dark:bg-boxdark text-black-500">
          <div className="w-full dark:border-strokedark shadow-2xl xl:w-1/2 mt-20 mb-5 rounded-lg bg-[#f5f5f7] opacity-100 border border-stroke m-auto">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
              <span className="mb-1.5 block font-medium">Thank you for signing up! Before you can continue, please set some account details.</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                <span className="pl-3">
                  Account details
                </span>
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <FormInputField
                    register={register("username", {required: "Required"})}
                    bodyClass="mb-2"
                    label="Username"
                    forType="username"
                    placeholder="Enter a username"
                  />
                  <FormInputField
                    register={register("firstname", {required: "Required"})}
                    bodyClass="mb-2"
                    label="First name"
                    forType="username"
                    placeholder="Enter your first name"
                  />
                  <FormInputField
                    register={register("lastname", {required: "Required"})}
                    bodyClass="mb-2"
                    label="Last name"
                    forType="lastname"
                    placeholder="Enter your last name"
                  />

                  <div className="mb-5 mt-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg  bg-red-500 p-4 text-white-500 transition hover:bg-opacity-90"
                  />
                </div>


              </form>
          </div>
        </div>
      </div>
    );
}