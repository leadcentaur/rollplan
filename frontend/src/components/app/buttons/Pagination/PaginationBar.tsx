import Pagination from "./Pagination"
import PaginationFirstButton from "./PaginationFirstButton"
import PaginationLastButton from "./PaginationLastButton";
import PaginationNextButton from "./PaginationNextButton";
import PaginationPageButton from "./PaginationPageButton";
import PaginationPrevButton from "./PaginationPrevButton";


interface PaginationBarProps {
    pageCount: number,
    currentPage: number,
    onPageItemClicked: (page: number) => void,
    className?: string,
}

export default function PaginationBar({ pageCount, currentPage, onPageItemClicked }: PaginationBarProps) {
    return (
        <Pagination>
            <PaginationFirstButton/>
            <PaginationNextButton/>
                <PaginationPageButton pageNumber="1"/>
                <PaginationPageButton pageNumber="2"/>
                <PaginationPageButton pageNumber="3"/>
            <PaginationPrevButton/>
            <PaginationLastButton/>
        </Pagination>
    ); 
}