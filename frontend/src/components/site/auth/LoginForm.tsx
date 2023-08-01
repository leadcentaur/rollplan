import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/SiteFormInputField";
import PasswordInputField from "../form/PasswordInputField";
import { TooManyRequestsError, UnauthorizedError } from "@/network/http-errors";
import { use, useState } from "react";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import LogoDark from "../../app/images/logo/logo-dark.svg"
import Logo from "../../app/images/logo/logo.svg";
import { passwordSchema, requiredStringSchema, usernameSchema } from "@/utils/validation";
import { error } from "console";
import Icon from "../ui/iconography/Icon";
import { faUniformMartialArts, faUser } from "@fortawesome/pro-solid-svg-icons";
import SocialSignInSection from "./SocialSignInSection";
import ErrorAlert from "@/components/app/components/ErrorAlert";

const validationSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
});


type LoginFormData = yup.InferType<typeof validationSchema>

interface LoginFormProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LoginForm({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginFormProps) {

const router = useRouter();
  const { mutateUser } = useAuthenticatedUser();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
});

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
        }
        if (error instanceof TooManyRequestsError) {
          setErrorText("You're trying too often");
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
                 <ErrorAlert errorText={errorText}/>
              }

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormInputField
                    register={register("username", {required: "Required"})}
                    label="Username"
                    placeholder="Please login with your username"
                    bodyClass="mb-4"
                    icon={faUniformMartialArts}
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