
import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function PasswordInputField({register, error, ...props}: PasswordInputFieldProps & ComponentProps<"input">) {
    return (
<div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Enter an account username"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-8 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...props}
            {...register}
          />
        </div>

        { error &&
            <div className="text-red-500">{error.message?.toString()}</div>
        }
      </div>
    )
}