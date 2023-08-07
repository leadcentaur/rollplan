import Icon from "@/components/site/ui/iconography/Icon";
import { Academy } from "@/models/academy";
import { faAt, faInfoCircle, faSchoolFlag, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface SettingsAcademyOnboardingURLInputFieldProps {
    userAcademy?: Academy,
    error?: FieldError,
}

export default function SettingsAcademyOnboardingURLInputField({error, placeholder, userAcademy,  ...props}: SettingsAcademyOnboardingURLInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="mb-5.5">
            <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="Username"
            >
            Onboarding URL
            <Icon className="text-blue-500 text-md opacity-20 ml-2 " icon={faInfoCircle}/>
            </label>
            <div className="relative">
            <span className="absolute left-4.5 top-2 text-xl mr-4">
                    <Icon className="text-red-500 text-lg opacity-20" icon={faGlobe}/>
                </span>
            <input
                className="w-full pl-13 rounded border border-stroke bg-gray py-3 px-4.5 text-siteGray-400 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                disabled
                name="onboarding"
                id="onboarding"
                placeholder="devidjhon24"
                defaultValue={"http://localhost:3000/member/signup?aid=" + userAcademy?._id}
            />
            </div>
        </div>

    );
}