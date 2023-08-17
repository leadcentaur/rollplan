import Icon from "@/components/site/ui/iconography/Icon";
import { faCalendarCheck, faSignHanging } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps, useState } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface AddEventDateInputFieldProps {
    register: UseFormRegisterReturn,
    selectedDate?: string,
    setGeneralDate?: () => string|undefined,
    error?: FieldError,
    label: string,
}

export default function EventDateInputField({register, error, placeholder, label, setGeneralDate, selectedDate, ...props}: AddEventDateInputFieldProps & ComponentProps<"input">) {


    return (
      <div>
        <label className="mb-3 block text-black dark:text-white">
          {label}
        </label>
        <div className="relative">
          <input
            type="datetime-local"
            value={generalDate}
            onChange={(date) => setGeneralDate(date.target.value)}
            className="custom-input-date custom-input-date-2 pl-12 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <Icon
              className="pl-2 text-red-500 text-lg opacity-20"
              icon={faCalendarCheck}
            />
          </div>
        </div>
      </div>
    );
}