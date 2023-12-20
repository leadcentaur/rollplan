import Pagination from "./Pagination";

interface PaginationBarProps {
    pageCount: number,
    currentPage: number,
    onPageItemClicked: (page: number) => void,
    className?: string,
}

export default function PaginationBar({ pageCount, currentPage, onPageItemClicked }: PaginationBarProps) {
    return (
        <Pagination>
            { currentPage > 1 &&
                <>
                    <Pagi
                </>
            }
        </Pagination>
    ); 
}