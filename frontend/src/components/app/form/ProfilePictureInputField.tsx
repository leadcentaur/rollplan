import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

interface ProfilePictureInputFieldProps {
    register: UseFormRegisterReturn,
    placeholder: string,
    label: string,
    error?: FieldError,
}

export default function ProfilePictureInputField({register, label, error, placeholder, ...props}: ProfilePictureInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="rounded-sm mt-5 mb-5 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {label}
              </h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
             
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  {placeholder}
                </label>
                <input
                  type="file"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  {...register}
                  {...props}
                />
              </div>
            </div>
        </div>
    );
}