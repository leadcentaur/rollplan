import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import { academyEvent } from "@/types/user-types";
import { faInfoCircle, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EventProps {
    eventType: academyEvent;
    titleText: string;
    subTitleText: string;
}

export default function Eventlog({eventType, titleText, subTitleText}: EventProps) {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Event log"/>
            <div className="overflow-auto h-72 relative mx-auto bg-white-500 dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-2 ring-stroke rounded-xl flex flex-col divide-y divide-siteGray-100 dark:divide-slate-200/5">
                <div className="flex flex-row items-center justify-between gap-4 p-4">

                    <div className="flex flex-row items-center justift-content gap-4 p-4">
                        <div className="h-14 w-14 rounded-full border border-stroke pl-1 flex items-center justify-center ">
                            <FontAwesomeIcon icon={faUserPlus} className="text-xl"/>
                        </div>
                        <div className="flex row justify-content space-between">
                            <div className="flex flex-col">
                                <strong className="text-slate-900 text-sm font-medium italic dark:text-slate-200">New member joined!&nbsp;&nbsp;</strong>
                                <span className="text-slate-500 text-sm font-medium dark:text-slate-400"> Daniel Yurisetti</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <FontAwesomeIcon icon={faInfoCircle} className="text-xl"/> */}
                    
                                <FontAwesomeIcon className="text-lg text-center" icon={faInfoCircle}/>
                              
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80"/>
                    <div className="flex flex-col">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">Debra Houston</strong>
                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">Analyst</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80"/>
                    <div className="flex flex-col">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">Jane White</strong>
                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">Director, Marketing</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80"/>
                    <div className="flex flex-col">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">Ray Flint</strong>
                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">Technical Advisor</span>
                    </div>
                </div>
                </div>
    </DefaultLayout>
    );

}
