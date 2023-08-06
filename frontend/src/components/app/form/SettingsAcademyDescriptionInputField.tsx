import Icon from "@/components/site/ui/iconography/Icon";
import { faAt, faSchoolFlag, faUniformMartialArts, faBookOpen } from "@fortawesome/pro-solid-svg-icons";    
import { faSubscript } from "@fortawesome/sharp-regular-svg-icons"
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface SettingsAcademyDescriptionInputFieldProps {
    register?: UseFormRegisterReturn,
    academy_description?: string,
    error?: FieldError,
}

export default function SettingsAcademyDescriptionInputField({register, error, placeholder, academy_description, ...props}: SettingsAcademyDescriptionInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="mb-5.5">
            <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="Username"
            >
            BIO
            </label>
            <div className="relative">
            <span className="absolute left-4.5 top-2 text-xl mr-4">
                <Icon className="text-red-500 text-lg opacity-20" icon={faBookOpen}/>
            </span>
            <textarea
                className="w-full rounded pl-13 border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                id="bio"
                rows={6}
                placeholder="Write the academy bio here"
                defaultValue={academy_description || ""}
            ></textarea>
            </div>
      </div>
    );
}