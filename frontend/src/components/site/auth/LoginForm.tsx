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

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
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
  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<LoginFormData>();
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
    <div className="relative">
        <div className="bg-hero-section bg-no-repeat h-screen">
          <video autoPlay loop muted className="absolute inset-0 object-cover h-full w-full xl:h-auto">
            <source
              src="video1.mp4"
              type="video/mp4"
            />
          </video>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 scrollbar-hide">
        <Link
          href="/"
          className=""
        >
          <Image
            src="https://i.imgur.com/akxtDmO.png"
            alt="Flow Blog logo"
            className="rounded-xl p-1 m-3"
            width={300}
            height={100}
          />
        </Link>
        <div className="absolute w-full bg-white-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {errorText &&
              <div className="flex items-center bg-red-100 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p>{errorText}</p>
              </div>
            }

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                  <FormInputField
                      register={register("username", {required: "Required"})}
                      type="username"
                      label="username"
                      placeholder="Your username"
                      maxLength={20}
                      fieldType="username"
                      error={errors.username}
                    />

                  <div className="text-red-400 italic">
                      {errors?.username && errors.username.message?.toString()}
                  </div>

                    <PasswordInputField
                       register={register("password", {required: "Required"})}
                       type="password"
                       label="password"
                       placeholder="••••••••"
                       error={errors.password}
                    />

                  <div className=" text-red-400 italic">
                      {errors?.password && errors.password.message?.toString()}
                  </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-primary-700 focus:ring-4 text-white-500 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
