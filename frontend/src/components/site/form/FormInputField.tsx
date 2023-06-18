import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

export type forType = 'email' | 'password' | 'username' | ''

interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    fieldType: forType,
    placeholder: string,
    label: string,
    error?: FieldError,
}

export default function FormInputField({register, label, error, fieldType, placeholder, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div>
            <label htmlFor={fieldType} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your {label}</label>
            <input {...register} type={fieldType} name={fieldType} id={fieldType} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>
        </div>
    );
}