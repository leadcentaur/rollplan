import Breadcrumb from "@/components/app/components/Breadcrumb";
import MemberList from "@/components/app/components/MembersList";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React from "react";

export default function Store() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Store" />
            <MemberList/>
        </DefaultLayout>
    );
  }
  