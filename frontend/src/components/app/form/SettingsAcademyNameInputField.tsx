import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface SettingsAcademyNameInputFieldProps {
    register: UseFormRegisterReturn,
    academy_name?: string,
    error?: FieldError,
}

export default function SettingsAcademyNameInputField({register, error, placeholder, academy_name, ...props}: SettingsAcademyNameInputFieldProps & ComponentProps<"input">) {
    return (
      <div className="w-full sm:w-1/2">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="fullName"
        >
          Academy name
        </label>
        <div className="relative">

          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="fullName"
            {...register}
            {...props}
            defaultValue={academy_name || ""}
          />
        </div>
      </div>
    );
}