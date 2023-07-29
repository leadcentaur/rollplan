import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface EmailInputFieldProps {
    register: UseFormRegisterReturn,
    wrapperStyle?: string,
    placeholder?: string,
    label: string,
    error?: FieldError,
    htmlFor: string,
}

export default function EmailInputField({register, label, error, wrapperStyle, placeholder, htmlFor, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
            {label}
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="email"
            name="emailAddress"
            id="emailAddress"
          placeholder="devidjond45@gmail.com"
            {...register}
            {...props}
          />
        </div>
      </div>
    );
}