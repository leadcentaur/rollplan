import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    placeholder: string,
    label: string,
    error?: FieldError,
}

export default function FormInputField({register, label, error, placeholder, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div>
            <label className="mb-3 block text-black dark:text-white">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full mb-3 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...props}
                  {...register}
                />
        </div>
    );
}