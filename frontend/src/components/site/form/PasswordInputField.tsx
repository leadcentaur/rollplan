import { ComponentProps, useState } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import { faEyeSlash, faEye, faKey } from "@fortawesome/pro-solid-svg-icons";
import  {IconDefinition} from "@fortawesome/pro-solid-svg-icons";
import Button from "../ui/typography/Button";
import Icon from "../ui/iconography/Icon";
import cx from "clsx";

interface Password {
    register?: UseFormRegisterReturn,
    label?: string,
    placeholder: string,
    passwordCompare?: (compareStr: string) => void,
    error?: FieldError,
}

export default function PasswordInputField({register, error, placeholder, passwordCompare, label, ...props}: Password & ComponentProps<"input">) {

    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="mb-6">
      <label htmlFor="password" className="mb-2.5 block font-medium text-black dark:text-white">
        {label || "Password"}
      </label>
      <div className="relative">
        
        {passwordCompare &&

            <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder || "Enter your password"} 
            {...props}
            {...register}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {passwordCompare(e.target.value.toString())}}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        
        }

        {!passwordCompare &&

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder} 
          {...props}
          {...register}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        } 

        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <Icon className="m-2 mb-4 mt-5 text-red-500 text-md opacity-20" icon={faKey}/>
        </div>


         <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <Icon icon={showPassword ? faEye : faEyeSlash} className="" onClick={() => {setShowPassword(!showPassword)}}/>
         </div>
      </div>


    </div>
    );
}
