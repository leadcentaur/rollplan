
import Button from "@/components/site/ui/typography/Button";
import { ButtonProps } from "@/components/site/ui/typography/Button";
import clsx from "clsx";
import { ComponentProps } from "react";



interface PaginationPageButtonProps {
    key?: number,
    isDisabled?: boolean,
    active?: boolean,
    children: React.ReactNode,

}

export default function PaginationPageButton({isDisabled, active, children, key}: PaginationPageButtonProps & ComponentProps<"button">) {
    return (
        <li>
            <button key={key} disabled={isDisabled || false} className={clsx(active == true ? 'flex display-hidden md:display-block items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' : 'flex display-hidden md:display-block items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 bg-gray-700 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white')}>
                {children}
            </button>
        </li>
    );
}
