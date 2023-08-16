import cx from "clsx";
import { ComponentProps } from "react";
import { FieldError,UseFormRegisterReturn } from "react-hook-form";

export type forType = 
    'bio'
    'profilepic' 
    

interface FormInputFieldProps {
    register: UseFormRegisterReturn,
    fieldType: forType,
    placeholder: string,
    label: string,
    error?: FieldError,
}

