import Icon from "@/components/site/ui/iconography/Icon";
import { faCalendarStar, faSignHanging } from "@fortawesome/pro-solid-svg-icons";
import cx, { clsx } from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";


interface EventTypeInputFieldProps {
    register: UseFormRegisterReturn,
    error?: FieldError,
}

export default function EventTypeInputField({register, error, placeholder, ...props}: EventTypeInputFieldProps & ComponentProps<"input">) {
    return (
        <div className="flex flex-col ">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Event type
                </label>
                <div className="relative">
                <select className="rounded border border-stroke py-3 px-2 outline-none ">
                    <option value="">BJJ Gi</option>
                    <option value="">BJJ No-Gi</option>
                    <option value="">BJJ Gi Fundamentals</option>
                    <option value="">BJJ No-Gi Fundamentals</option>
                    <option value="">BJJ Gi (Adult)</option>
                    <option value="">BJJ No-Gi (Adult)</option>
                    <option value="">BJJ Gi (Youth)</option>
                    <option value="">BJJ No-Gi (Youth)</option>
                    <option value="">BJJ Gi Advanced (Adult)</option>
                    <option value="">BJJ Gi Advanced (Youth)</option>
                    <option value="">BJJ No-Gi Advanced (Adult)</option>
                    <option value="">BJJ No-gi Advanced (Youth)</option>
                    <option value="">Open mat Gi</option>
                    <option value="">Open mat No-Gi</option>
                    <option value="">Open mat (Gi/No-Gi)</option>
                    <option value="">Seminar</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <Icon className="pl-2 text-red-500 text-lg opacity-20" icon={faCalendarStar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

