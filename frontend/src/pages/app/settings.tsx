import Breadcrumb from "@/components/app/components/Breadcrumb";
import MemberList from "@/components/app/components/MembersList";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React from "react";

export default function Settings() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Settings" />
            <MemberList/>
        </DefaultLayout>
    );
  }
  