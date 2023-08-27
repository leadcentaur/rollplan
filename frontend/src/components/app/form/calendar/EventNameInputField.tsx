import Icon from "@/components/site/ui/iconography/Icon";
import { faSignHanging } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface AddEventNameInputFieldProps {
    register?: UseFormRegisterReturn,
    editEventValue?: string,
    error?: FieldError,
}

export default function EventNameInputField({register, error, editEventValue, placeholder, ...props}: AddEventNameInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="flex flex-col   ">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Event Name
                </label>
                <div className="relative text-sm">
                    <input
                        type="text"
                        defaultValue={editEventValue || ""}
                        {...register}
                        {...props}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                {error && 
                    <div>
                        <p className="text-red-500 italic">{error.message?.toString()}</p>
                    </div>
                }
            </div>
        </div>
    );
}