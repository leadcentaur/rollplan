import ProfilePicPlaceholder from "../../../assets/images/placeholders/profile-pic-placeholder.png"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useUserAcademy from "@/hooks/useCurrentAcademy";
import { Academy } from "@/models/academy";
import * as AcademyApi from "../../../network/api/academys";
import { GetServerSideProps } from "next";
import { User } from "@/models/user";
import { Members } from "@/models/members-list";
import useAcademyMembers from "@/hooks/useAcademyMembers";
import { ColorRing } from "react-loader-spinner";
import MemberListEntry from "./MemberListEntry";
import { beltType } from "@/types/user-types";
import ErrorAlert from "./ErrorAlert";
import WarningAlert from "./WarningAlert";
import Spinner from "@/components/site/ui/typography/Spinner";

export default function MemberList() {
  
  const { members, membersLoading, membersLoadingError } = useAcademyMembers(); 

  return !membersLoadingError ? (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Members
      </h4>

      <div className="flex flex-col">
        <div className="inline-grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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

      { membersLoading &&
        <Spinner/>        
      }

      { members && members.length != 0 &&

          <div>
          {members.map((user: User, index: number) => (
            <MemberListEntry
              key={index}
              memebrsLen={members.length}
              firstname={user.firstname}
              lastname={user.lastname}
              belt={user.belt as beltType}
              numberOfStripes={user.numberOfStripes}
              joinDate={user.createdAt}
              email={user.email}
              profilePicUrl={user.profilePicUrl}
            />
          ))}
          </div>
      }

      { !members && !membersLoading &&  
         <WarningAlert warningTextHeading="Page notification" warningText="Unable to load academy members."/>
      }

      {

      }

      { members && (members.length == 0) &&
          <WarningAlert warningTextHeading="Page notification" warningText="This academy does not have any memebrs yet"/>
      }

      </div>
    </div>
  ) : 
    <ErrorAlert errorTextHeading="Page error" errorText="There was an error loading the academy members"/>
};

