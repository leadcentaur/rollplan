import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";

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

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpFormData>();

    async function onSubmit(credentials: SignUpFormData) {
        try {
            const newUser = await UsersApi.signUp(credentials);
            alert(JSON.stringify(newUser));
        } catch (error) {
            console.error(error);
            alert(error);
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
