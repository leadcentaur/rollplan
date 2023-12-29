import Button from "@/components/site/ui/typography/Button";
import { ButtonProps } from "@/components/site/ui/typography/Button";
import { ComponentProps } from "react";


interface PaginationPrevButtonProps {
    isDisabled?: boolean,
}

export default function PaginationPrevButton({isDisabled}: PaginationPrevButtonProps & ComponentProps<"button">) {
    return (
        <li>
            <button disabled={isDisabled || false} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
            </button>
        </li>
    );
}