import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

export type forType = 
      'email' 
    | 'password' 
    | 'username' 
    | 'academy_name'
    | 'academy_location'
    | 'academy_owner'
    | 'firstname'
    | 'lastname'

interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    forType?: forType,
    placeholder: string,
    bodyClass: string,
    label: string,
    error?: FieldError,
}

export default function FormInputField({register, label, error, forType, placeholder, bodyClass, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div className={bodyClass}>
            <label htmlFor={forType || "text"} className="mb-2.5 block font-medium text-black dark:text-white">
            {label}
            </label>
                <div className="relative">
                <input
                    type={forType}
                    placeholder={placeholder}
                    {...register}
                    {...props}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />

                { error &&
                    <div className="text-red-500">{error.message?.toString()}</div>
                }
            </div>
        </div>
    );
}