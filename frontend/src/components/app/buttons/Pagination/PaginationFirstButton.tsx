import PrevArrow from "@/components/site/ui/iconography/PrevArrow";

interface PaginationFirstProps {
    isDisabled?: boolean,
}

export default function PaginationFirstButton({isDisabled}: PaginationFirstProps) {
    return (
        <li>
            <button disabled={isDisabled || false} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-siteGray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <PrevArrow/>
            </button>
        </li>
    );
}