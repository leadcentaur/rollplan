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
    forType: forType,
    label: string,
    error?: FieldError,
}

export default function LastNameInputField({register, error, forType, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 relative flex-shrink-0 ">
            <input type="text" 
                {...register}
                {...props}
                className=' w-full rounded-md border bg-transparent border-stroke mb-2 px-3 py-4 lg:ml-none md:ml-none   outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                placeholder="Last name"
            />

                { error &&
                    <div className="text-red-500">{error.message?.toString()}</div>
                }

        </div>
    );
}