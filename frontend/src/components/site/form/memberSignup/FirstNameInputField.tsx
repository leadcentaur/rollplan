import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import Icon from "../../ui/iconography/Icon";
import { faF, faInputText } from "@fortawesome/pro-solid-svg-icons";

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

export default function FirstNameInputField({register, error, forType, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="w-full md:w-1/2 relative flex-shrink-0">        
            <input 
                type="firstname"
                className='w-full rounded-md border bg-transparent border-stroke px-4 py-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                placeholder="First name" 
                {...props}
                {...register}
            /> 
       
            { error &&
                    <div className="text-red-500">{error.message?.toString()}</div>
            }
        </div>
    );
}