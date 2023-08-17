import Icon from "@/components/site/ui/iconography/Icon";
import { faSignHanging } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface AddEventNameInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function EventNameInputField({register, error, placeholder, ...props}: AddEventNameInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="flex flex-col   ">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Event Name
                </label>
                <div className="relative text-sm">
                    <input
                        type="text"
                        {...register}
                        {...props}
                        className="w-full pl-12 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <Icon className="pl-2 text-red-500 text-lg opacity-20" icon={faSignHanging} />
                    </div>
                </div>
            </div>
        </div>
    );
}