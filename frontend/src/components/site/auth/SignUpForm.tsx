import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useState } from "react";
import { BadRequestError, ConflictError } from "@/network/http-errors";

interface SignUpFormData {
    username: string,
    email: string,
    password: string,
}

interface SignUphtmlFormProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpForm({onDismiss, onLoginInsteadClicked}: SignUphtmlFormProps) {

    const { mutateUser } = useAuthenticatedUser();
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpFormData>();

    async function onSubmit(credentials: SignUpFormData) {
        try {
            setErrorText(null);
            const newUser = await UsersApi.signUp(credentials);
            mutateUser(newUser);
        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError) {
              setErrorText(error.message);
            } else {
              console.error(error);
              alert(error);
            } 
          }
    }
  

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-600 h-screen overflow-hidden scrollbar-hide">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className=""
        >
          <Image
            src="https://i.imgur.com/akxtDmO.png"
            alt="Flow Blog logo"
            className="rounded-xl p-1 m-3"
            width={200}
            height={100}
          />
        </Link>
      <div className="w-full bg-white-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
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
                      fieldType="username"
                      error={errors.username}
                    />
                    <FormInputField
                      register={register("email", {required: "Required"})}
                      type="email"
                      label="email"
                      placeholder="email@example.com"
                      fieldType="email"
                      error={errors.email}
                    />
                    <PasswordInputField
                       register={register("password", {required: "Required"})}
                       type="password"
                       label="password"
                       placeholder="••••••••"
                       error={errors.password}
                    />
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white-500 bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?
                      <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                         Login here
                      </Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}
