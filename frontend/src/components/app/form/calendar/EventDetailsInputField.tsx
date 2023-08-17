import Icon from "@/components/site/ui/iconography/Icon";
import { faSignHanging } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface EventDetailsInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function EventDetailsInputField({register, error, placeholder, ...props}: EventDetailsInputFieldProps & ComponentProps<"input">) {
    return (
      <div>
        <label className="mb-3 block text-black dark:text-white">
          Event details
        </label>
        <div className="relative">
          <textarea
            rows={6}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
        </div>
      </div>
    );
}