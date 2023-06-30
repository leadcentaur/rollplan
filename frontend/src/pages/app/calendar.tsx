import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React from "react";

export default function Calendar() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Calendar" />
        </DefaultLayout>
    );
  }
  