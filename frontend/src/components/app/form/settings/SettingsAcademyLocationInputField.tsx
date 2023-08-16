import Icon from "@/components/site/ui/iconography/Icon";
import { faLocationPin, faSchoolFlag, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface SettingsAcademyLocationInputFieldProps {
    register?: UseFormRegisterReturn,
    academy_location?: string,
    error?: FieldError,
}

export default function SettingsAcademyLocationInputField({register, error, placeholder, academy_location, ...props}: SettingsAcademyLocationInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="location"
        >
         Academy location
        </label>
        <div className="relative">
            <span className="absolute left-4.5 top-2 text-xl mr-4">
                <Icon className="text-red-500 text-lg opacity-20" icon={faLocationPin}/>
            </span>
          <input
            className="w-full pl-13 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="location"
            {...register}
            {...props}
            id="location"
            placeholder={academy_location || "No Academy location set."}
            defaultValue={academy_location || ""}
          />
        </div>
      </div>
    );
}