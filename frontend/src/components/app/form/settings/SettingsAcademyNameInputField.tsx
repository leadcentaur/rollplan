import Icon from "@/components/site/ui/iconography/Icon";
import { faLandmark, faSchoolFlag, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface SettingsAcademyNameInputFieldProps {
    register?: UseFormRegisterReturn,
    academy_name?: string,
    error?: FieldError,
}

export default function SettingsAcademyNameInputField({register, error, placeholder, academy_name, ...props}: SettingsAcademyNameInputFieldProps & ComponentProps<"input">) {
    return (
      <div className="w-full sm:w-1/2">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="fullName"
      >
        Academy Name
      </label>
      <div className="relative">
        <span className="absolute left-4.5 top-2 text-xl mr-4">
        <Icon className="text-red-500 text-lg opacity-20 " icon={faLandmark}/>
        </span>
        <input
          className="w-full pl-13 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          {...register}
          {...props}
          id="academy_name"
          placeholder={academy_name || "No academy name set."}
          defaultValue={academy_name || ""}
        />
      </div>
    </div>
    );
}