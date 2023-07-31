import { IconProp } from "@fortawesome/fontawesome-svg-core";
import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";
import Icon from "../../ui/iconography/Icon";


interface VerificationCodeInputFieldProps {
    register: UseFormRegisterReturn,
    handleSendClick: () => void,
    verificationCodeRequestPending: boolean,
    secondsLeft: number,
    placeholder: string,
    bodyClass: string,
    label: string,
    error?: FieldError,
    icon?: IconProp,
}

export default function VerificationCodeInputField({register, label, error, icon,  placeholder, secondsLeft, handleSendClick, verificationCodeRequestPending, bodyClass, ...props}: VerificationCodeInputFieldProps& ComponentProps<"input">) {
    return (
        <div className={bodyClass}>
            <label htmlFor="text" className="mb-2.5 block  font-medium text-black dark:text-white">
            {label}
            </label>
                <div className="relative">
                <input
                    placeholder={placeholder}
                    {...register}
                    {...props}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <button onClick={handleSendClick} disabled={verificationCodeRequestPending} className="text-white-500 bg-red-500 absolute right-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Send code
                { secondsLeft > 0 && `(${secondsLeft})`}
                </button>
                { icon &&
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <Icon className="m-2 mb-5 mt-5 text-red-500 text-md opacity-20" icon={icon}/>
                    </div>
                }
                { error &&
                    <div className="text-red-500">{error.message?.toString()}</div>
                }
            </div>
        </div>
    );
}