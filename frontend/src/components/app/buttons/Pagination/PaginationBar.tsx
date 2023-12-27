import { Fragment } from "react";
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

    const paginationMinPage = Math.min(pageCount, Math.max(currentPage + 4, 10));
    const paginationMaxPage = Math.max(1, Math.min(currentPage - 5), paginationMinPage - 9);

    const numberedPageItems: JSX.Element[] = [];
    for (let i = paginationMinPage; i <= paginationMaxPage; i++){
        let paginationItem: JSX.Element;
        if (i === currentPage) {
            const currentPageItemSizeMdOnly = <PaginationPageButton >{i}</PaginationPageButton>
            const currentPageItemSizeSmOnly = <PaginationPageButton >Page: {i}</PaginationPageButton>

            paginationItem = 
             <Fragment key={i}>
                {currentPageItemSizeMdOnly}
                {currentPageItemSizeSmOnly}
             </Fragment>
        } else {
            paginationItem = 
                <PaginationPageButton key={i} onClick={() => onPageItemClicked(i)}>
                    {i}
                </PaginationPageButton>
        }
        numberedPageItems.push(paginationItem);
    }

    console.log("Length of page items: ", numberedPageItems.length);



    return (
        <Pagination>
            { currentPage > 1 &&
                <>
                    <PaginationFirstButton/>
                    <PaginationPrevButton/> 
                </>    
            }
            {numberedPageItems.length}
            { currentPage < pageCount &&    
                <>
                    <PaginationNextButton/>
                    <PaginationLastButton/>
                </>
            }
            
        </Pagination>
    ); 
}