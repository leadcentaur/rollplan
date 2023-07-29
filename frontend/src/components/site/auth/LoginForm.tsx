import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/SiteFormInputField";
import PasswordInputField from "../form/PasswordInputField";
import { UnauthorizedError } from "@/network/http-errors";
import { use, useState } from "react";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import LogoDark from "../../app/images/logo/logo-dark.svg"
import Logo from "../../app/images/logo/logo.svg";
import { passwordSchema, usernameSchema } from "@/utils/validation";
import { error } from "console";
import Icon from "../ui/iconography/Icon";
import { faUniformMartialArts, faUser } from "@fortawesome/pro-solid-svg-icons";
import SocialSignInSection from "./SocialSignInSection";

// add validation here
// const validationSchema = yup.object({
//   username: usernameSchema.required("Required"),
//   password: passwordSchema.required("Required")
// })

type LoginFormData = yup.InferType<typeof validationSchema>

interface LoginFormProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LoginForm({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginFormProps) {

const router = useRouter();
  const { mutateUser } = useAuthenticatedUser();
  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<LoginFormData>()
  const [errorText, setErrorText] = useState<string | null>(null);

  async function onSubmit(credentials: LoginFormData) {
    try {
        setErrorText(null);
        const user = await UsersApi.login(credentials);
        mutateUser(user);
        router.push("/app");
    } catch (error) {
        if (error instanceof UnauthorizedError) {
          setErrorText("Invalid credentials");
        } else {
          console.error(error);
          alert(error);  
        }
    }
  }

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
                    icon={faUser}
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
              <SocialSignInSection/>
              <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link href="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
            </div>
            
          </div>
     
      </div>
    );
}