import ItemPurchaseButton from "@/components/app/buttons/ItemPurcahseButtons";
import BillingItemCard from "@/components/app/components/BillingItemCard";
import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React from "react";

export default function Billing() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Billing" />

            <div className="mx-auto items-center gap-4 justify-between flex flex-row mt-5">
                <BillingItemCard featureImageUrl="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-brazilian-jiu-jitsu-21abb64f-ddd9-4ce1-9e37-cfebc277285a.jpg?w=1500&h=1054&crop=1"/>
                <BillingItemCard featureImageUrl="https://d2779tscntxxsw.cloudfront.net/5b9d93f524069.png?width=650&quality=80"/>
                <BillingItemCard featureImageUrl="https://d2779tscntxxsw.cloudfront.net/5b9d93f524069.png?width=650&quality=80"/>
            </div>
        </DefaultLayout>    
    );
  }
  