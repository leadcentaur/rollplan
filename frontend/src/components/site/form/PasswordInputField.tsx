import { ComponentProps, useState } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import { faEyeSlash, faEye } from "@fortawesome/pro-solid-svg-icons";
import  {IconDefinition} from "@fortawesome/pro-solid-svg-icons";
import Button from "../ui/typography/Button";
import Icon from "../ui/iconography/Icon";

interface Password {
    register: UseFormRegisterReturn,
    placeholder: string,
    label: string,
    error?: FieldError,
}

export default function PasswordInputField({register, label, error, placeholder, ...props}: Password & ComponentProps<"input">) {

    const passwordType = "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label htmlFor={passwordType} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your {label}
                <div className="py-2" x-data="{ show: true }">
                <div className="relative">
                  <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     type={showPassword ? "text" : passwordType} placeholder={placeholder} {...register} />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <Icon icon={showPassword ? faEye : faEyeSlash} className="" onClick={() => {setShowPassword(!showPassword)}}/>
                  </div>
                </div>
              </div>
            </label>
        </div>
    );
}