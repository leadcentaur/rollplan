

import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import Icon from "../../ui/iconography/Icon";
import { faHouse } from "@fortawesome/pro-solid-svg-icons";

interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function AcademyNameInputField({register, error, ...props}: FormInputFieldProps & ComponentProps<"input">) {
    return (
    <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Academy Name
        </label>
        <div className="relative">
          <input
            type="academy_name"
            {...register}
            {...props}
            placeholder="Your academy name"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <Icon className="pl-2  text-red-500" icon={faHouse}/>
          </div>
        </div>
        { error &&
            <div className="text-red-500">{error.message?.toString()}</div>
        }
      </div>
    )
}