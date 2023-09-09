import Image from "next/image";
import PurchaseIconButton from "./PurchaseItemButton";

interface BillingItemCardProps {
    featureImageUrl: string,
    featuredText: string,
    featuredHeading: string,
}


export default function BillingItemCard({featureImageUrl, featuredHeading, featuredText}: BillingItemCardProps) {
    return (

        <div className="max-w-sm bg-white-500 border  border-stroke rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a className="" href="#">
                <Image className="rounded-t-lg " height={400} width={400} src={featureImageUrl} alt="Feature" />
            </a>
            <div className="p-5 ">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">{featuredHeading}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{featuredText}</p>
                <a href="#" className="inline-flex items-center   px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <PurchaseIconButton/>
                </a>
            </div>
        </div>

    );
}