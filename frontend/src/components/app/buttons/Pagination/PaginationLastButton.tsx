import NextArrow from "@/components/site/ui/iconography/NextArrow";
import PrevArrow from "@/components/site/ui/iconography/PrevArrow";
import { ComponentProps } from "react";

interface PaginationLastProps {
    isDisabled?: boolean
}

export default function PaginationLastButton({isDisabled, ...props}: PaginationLastProps & ComponentProps<"button">) {
    return (
        <li>
            <button disabled={isDisabled || false} {...props} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <NextArrow/>
            </button>
        </li>
    );
}