import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/FormInputField";
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
import { faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";

// add validation here
const validationSchema = yup.object({
  username: usernameSchema.required("Required"),
  password: passwordSchema.required("Required")
})

type LoginFormData = yup.InferType<typeof validationSchema>

interface LoginFormProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LoginForm({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginFormProps) {

const router = useRouter();
  const { mutateUser } = useAuthenticatedUser();
  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema)
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

                <button className="text-black-500 flex w-full items-center justify-center gap-3.5 rounded-lg  bg-siteGray-100 p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-siteGray-100">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link href="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
     
      </div>
    );
}