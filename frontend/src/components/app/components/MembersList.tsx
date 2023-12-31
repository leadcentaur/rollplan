import ProfilePicPlaceholder from "../../../assets/images/placeholders/profile-pic-placeholder.png"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useUserAcademy from "@/hooks/useCurrentAcademy";
import { Academy } from "@/models/academy";
import * as AcademyApi from "../../../network/api/academys";
import { GetServerSideProps } from "next";
import { MemberPage, User } from "@/models/user";
import { Members } from "@/models/members-list";
import useAcademyMembers from "@/hooks/useAcademyMembers";
import MemberListEntry from "./MemberListEntry";
import { beltType } from "@/types/user-types";
import ErrorAlert from "./ErrorAlert";
import WarningAlert from "./WarningAlert";
import Spinner from "@/components/site/ui/typography/Spinner";
import PaginationBar from "../buttons/Pagination/PaginationBar";


export const getServerSideProps: GetServerSideProps<MemberPageProps> = async ({params}) => {
  const data = await AcademyApi.getAcademyMembers("64ebc7d796b9039bd7e9aa2a", 1);
  return { props: { data} };
}

interface MemberPageProps {
  data: MemberPage,
}

export default function MemberList({data}: MemberPageProps) {
  
  console.log("Hello" + JSON.stringify(data.members))  

  return (
    <div className="rounded-sm border border-stroke bg-white-500 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <div className="flex flex-col">
        <div className="inline-grid grid-cols-3 rounded-sm bg-white-500 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Member
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Belt
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              
            </h5>
          </div>
            <div className="hidden md:block xl:block lg:block p-2.5 text-center xl:p-5 sm:shrink ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
          </div>
          <p>
          </p>
        </div>


      </div>
      <PaginationBar pageCount={30} currentPage={12} onPageItemClicked={() => {}}/>
    </div>
  );
};

