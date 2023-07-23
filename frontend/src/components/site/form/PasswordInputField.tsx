import { ComponentProps, useState } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import { faEyeSlash, faEye } from "@fortawesome/pro-solid-svg-icons";
import  {IconDefinition} from "@fortawesome/pro-solid-svg-icons";
import Button from "../ui/typography/Button";
import Icon from "../ui/iconography/Icon";
import cx from "clsx";

interface Password {
    register: UseFormRegisterReturn,
    placeholder: string,
    error?: FieldError,
}

export default function PasswordInputField({register, error, placeholder, ...props}: Password & ComponentProps<"input">) {

    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="mb-6">
      <label htmlFor="password" className="mb-2.5 block font-medium text-black dark:text-white">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...props}
          placeholder={placeholder} 
          {...register}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

         <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <Icon icon={showPassword ? faEye : faEyeSlash} className="" onClick={() => {setShowPassword(!showPassword)}}/>
        </div>
      </div>
    </div>
    );
}

/*


                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      {...props}
                      placeholder={placeholder} 
                      {...register}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <Icon icon={showPassword ? faEye : faEyeSlash} className="" onClick={() => {setShowPassword(!showPassword)}}/>
                    </div>
                  </div>
                </div>

*/