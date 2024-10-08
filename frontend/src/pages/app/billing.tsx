import ItemPurchaseButton from "@/components/app/buttons/ItemPurcahseButtons";
import BillingItemCard from "@/components/app/components/BillingItemCard";
import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import Icon from "@/components/site/ui/iconography/Icon";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import React from "react";

export default function Billing() {  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Billing" />
                <div className="rounded-lg border-stroke border p-3 mb-6 border-stroke bg-white-500 w-1/2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <span className="m-8">
                        <h3 className="text-xl font-bold text-black dark:text-white border-b pb-3 border-stroke mb-8">
                            Subscription & Billing <Icon className="mx-2 mb-1" icon={faCircleInfo}/>
                        </h3>
                        <span className="flex flex-row md:gap-24">
                            <p className="font-semibold opacity-60 italic ">Active subscription: </p>
                            <p className="">6 month membership</p>
                        </span>
                        <span className="flex flex-row md:gap-8">
                            <p className="font-semibold opacity-60 italic ">Subscription pruchase date: </p>
                            <p className="">September 6th, 2023</p>
                        </span>
                        <span className="flex flex-row md:gap-8">
                            <p className="font-semibold opacity-60 italic ">Subscription expiration date: </p>
                            <p className="">March 6th, 2023</p>
                        </span>
                    </span>
                </div>
            <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <BillingItemCard featuredHeading="10 Class pass" featuredText="The 10 month class pass includes 10 access to Gi and No-Gi Classes. A really great deal." featureImageUrl="https://i.ytimg.com/vi/cEKNf0lw5l0/maxresdefault.jpg"/>
                    <BillingItemCard featuredHeading="6 month membership" featuredText="The 6 month membership grants you unlimited access to all Grapple lab classes." featureImageUrl="https://i.ytimg.com/vi/2GUFbs4mrhQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBiaIQV_z5JSDEe9O3KdB32ud5AxQ"/>
                    <BillingItemCard featuredHeading="1 year membership" featuredText="The 1 year membership grants you exlusive access to all grapple lab classes, merch and vip events." featureImageUrl="https://i.ytimg.com/vi/GZoMbg0q2Uc/maxresdefault.jpg"/>
                </div>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

                </div>
            </>
        </DefaultLayout>    
    );
  }
  