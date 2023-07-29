
import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import Icon from "../../ui/iconography/Icon";
import { faUser } from "@fortawesome/pro-solid-svg-icons";

interface UsernameInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function UsernameInputField({register, error, ...props}: UsernameInputFieldProps & ComponentProps<"input">) {
    return (
    <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          
          Username
        </label>
        <div className="relative">
          <input
            type="username"
            placeholder="Enter an account username"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 pl-13 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...props}
            {...register}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <Icon className="m-2 mb-5 mt-5 text-red-500 text-md opacity-20" icon={faUser}/>
          </div>

        </div>

        { error &&
            <div className="text-red-500">{error.message?.toString()}</div>
        }
      </div>
    )
}