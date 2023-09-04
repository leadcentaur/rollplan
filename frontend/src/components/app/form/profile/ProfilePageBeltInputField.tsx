import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import { beltType } from "@/types/user-types";
import * as utils from "../../../../utils/utils";

interface BeltInputFieldProps {
    register: UseFormRegisterReturn,
    wrapperStyle?: string,
    placeholder?: string,
    beltValue?: string,
    label?: string,
    error?: FieldError,
    htmlFor: string,
}

export default function BeltInputField({register, label, beltValue, error, wrapperStyle, placeholder, htmlFor, ...props}: BeltInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="belt"
        >
            {label || "Belt"}
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="belt"
            defaultValue={utils.capitalizeFirstLetter(beltValue!)}
            {...register}
            {...props}
          />
        </div>
      </div>
    );
}