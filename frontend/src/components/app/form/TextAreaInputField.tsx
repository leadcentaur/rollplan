import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

interface TextAreaInputFieldProps {
    register: UseFormRegisterReturn,
    placeholder: string,
    label: string,
    error?: FieldError,
}

export default function TextAreaInputField({register, label, error, placeholder, ...props}: TextAreaInputFieldProps & ComponentProps<"textarea">) {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">     
            <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                <label className="mb-3 block text-black dark:text-white">
                    {label}
                </label>
                    <textarea
                        rows={6}
                        placeholder={placeholder}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register}
                        {...props}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}