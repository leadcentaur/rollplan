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


    const paginationMaxPage = Math.min(pageCount, Math.max(currentPage + 4, 10));
    const paginationMinPage = Math.max(1, Math.min(currentPage - 5, paginationMaxPage - 9));

    const numberedPageItems: JSX.Element[] = [];
    for (let i = paginationMinPage; i <= paginationMaxPage; i++){
        let paginationItem: JSX.Element;
        if (i === currentPage) {

            const currentPageItemSizeMdOnly = <PaginationPageButton active={true} sizeClassName="hidden md:block">{i}</PaginationPageButton>
            const currentPageItemSizeSmOnly = <PaginationPageButton active={true} sizeClassName="sm:block md:hidden">Page: {i}</PaginationPageButton>

            paginationItem = 
             <Fragment key={i}>
                {currentPageItemSizeMdOnly}
                {currentPageItemSizeSmOnly}
             </Fragment>

        } else {
            paginationItem = 
                <PaginationPageButton key={i} onClick={() => onPageItemClicked(i)} sizeClassName="hidden md:block">
                    {i}
                </PaginationPageButton>
        }
        numberedPageItems.push(paginationItem);
    }

    console.log("Length of page items: ", numberedPageItems.length);



    return (
        <Pagination className="p-3">

                <>
                    <PaginationFirstButton  onClick={() => {onPageItemClicked(1)}} />
                    <PaginationPrevButton currentPage={currentPage} onClick={() => {onPageItemClicked(currentPage - 1)}} /> 
                </>    

            { pageCount > 1 &&
            <>
                {numberedPageItems}
            </>
            }
                <>
                    <PaginationNextButton currentPage={currentPage} maxPage={paginationMaxPage} onClick={() => {onPageItemClicked( currentPage + 1)}}/>
                    <PaginationLastButton onClick={() => {onPageItemClicked(pageCount)}}/>
                </>

            
        </Pagination>
    ); 
}