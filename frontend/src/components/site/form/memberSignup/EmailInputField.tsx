
import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function EmailInputField({register, error, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
    <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            {...register}
            {...props}
            placeholder="Enter your academy email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        { error &&
            <div className="text-red-500">{error.message?.toString()}</div>
        }
      </div>
    )
}