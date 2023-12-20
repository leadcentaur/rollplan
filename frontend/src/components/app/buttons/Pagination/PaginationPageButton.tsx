
import Button from "@/components/site/ui/typography/Button";
import { ButtonProps } from "@/components/site/ui/typography/Button";


interface PaginationPageButtonProps {
    isDisabled?: boolean,
    pageNumber?: string,
}

export default function PaginationPageButton({isDisabled, pageNumber}: PaginationPageButtonProps) {
    return (
        <li>
            <button disabled={isDisabled || false} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {pageNumber}
            </button>
        </li>
    );
}