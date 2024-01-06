import PrevArrow from "@/components/site/ui/iconography/PrevArrow";
import Button from "@/components/site/ui/typography/Button";
import { ButtonProps } from "@/components/site/ui/typography/Button";
import { ComponentProps } from "react";


interface PaginationNextButtonProps {
    isDisabled?: boolean,
    currentPage: number,
    maxPage: number,
}

export default function PaginationNextButton({isDisabled, maxPage, currentPage, ...props}: PaginationNextButtonProps & ComponentProps<"button">) {
    return (
        <li>
            <button {...props} disabled={currentPage < maxPage ? false : true} className="flex items-center justify-center px-3 h-8 border border-s-0 leading-tight text-gray-500 bg-white border-border-gray-300 hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
            </button>
        </li>
    );
}