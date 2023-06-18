import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";

interface LoginFormData {
  username: string,
  password: string,
}

interface LoginFormProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LoginForm({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginFormProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<LoginFormData>();

  async function onSubmit(credentials: LoginFormData) {
    try {
        const user = await UsersApi.login(credentials);
        alert(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        alert(error);  
    }
  }

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-600 h-screen overflow-hidden scrollbar-hide">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 scrollbar-hide">
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
              Sign in to your account
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
                    <PasswordInputField
                       register={register("password", {required: "Required"})}
                       type="password"
                       label="password"
                       placeholder="••••••••"
                       error={errors.password}
                    />

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
    </section>
  );
}
