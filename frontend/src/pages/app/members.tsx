import PaginationBar from "@/components/app/buttons/Pagination/PaginationBar";
import Breadcrumb from "@/components/app/components/Breadcrumb";
import MemberList from "@/components/app/components/MembersList";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React from "react";

export default function Members() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Members" />
            <MemberList/>
            <PaginationBar pageCount={5} currentPage={2} onPageItemClicked={() => {}}/>
        </DefaultLayout>
    );
  }
  