import { IconProp } from "@fortawesome/fontawesome-svg-core";
import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import Icon from "../ui/iconography/Icon";

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
    icon?: IconProp,
}

export default function FormInputField({register, label, error, icon, forType, placeholder, bodyClass, ...props}: FormInputFieldProps & ComponentProps<"input">) {
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 pl-13 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                { icon &&
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <Icon className="m-2 mb-5 mt-5 text-red-500 text-md opacity-20" icon={icon}/>
                    </div>
                }

                { error &&
                    <div className="text-red-500">{error.message?.toString()}</div>
                }
            </div>
        </div>
    );
}