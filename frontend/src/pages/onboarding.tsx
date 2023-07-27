import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { usernameSchema } from "@/utils/validation";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as UsersApi from "@/network/api/users";;
import { useEffect } from "react";

const validationSchema = yup.object({
    username: usernameSchema.required("Required"),
});

type OnboardingInput = yup.InferType<typeof validationSchema>;

export default function OnboardingPage() {
    const { user, mutateUser } = useAuthenticatedUser();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OnboardingInput>({
        resolver: yupResolver(validationSchema),
    });

    async function onSubmit({ username }: OnboardingInput) {
        try {
            const updatedUser = await UsersApi.updateUser({ username, displayName: username });
            mutateUser(updatedUser);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    useEffect(() => {
        if (user?.username) {
            const returnTo = router.query.returnTo?.toString();
            router.push(returnTo || "/");
        }
    }, [user, router]);

    return (
        <div className="rounded-md dark:border-strokedark dark:bg-boxdark text-black-500">
          <div className="w-full dark:border-strokedark shadow-2xl xl:w-1/2 mt-20 mb-5 rounded-lg bg-[#f5f5f7] opacity-100 border border-stroke m-auto">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                <span className="pl-3">
                  Sign into your academy
                </span>
              </h2>

              {errorText &&
                <div className="flex items-center bg-red-100 text-white text-sm font-bold px-4 py-3 m-5" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>{errorText}</p>
                </div>
                }

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormInputField
                    register={register("username", {required: "Required"})}
                    label="Username"
                    placeholder="Please login with your username"
                    fieldType="username"
                    bodyClass="mb-4"
                    error={errors.username}
                />

                  { errors.username &&

                  <div className=" text-red-400 italic">
                    {errors.username.message?.toString()}
                  </div>

                  }


                <PasswordInputField
                    register={register("password", {required: "Required"})}
                    placeholder="Please enter your password to login"
                    error={errors.password}
                />

                { errors.password &&

                  <div className=" text-red-400 italic">
                      {errors.password.message?.toString()}
                  </div>

                }             
                    
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg  bg-red-500 p-4 text-white-500 transition hover:bg-opacity-90"
                  />
                </div>

              
             
              </form>
          </div>
     
      </div>
    );
}