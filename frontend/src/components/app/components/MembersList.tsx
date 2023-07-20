import ProfilePicPlaceholder from "../../../assets/images/profile-pic-placeholder.png"
import Link from "next/link";
import React from "react";
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

export default function MemberList() {

  const { members, membersLoading, membersLoadingError } = useAcademyMembers(); 


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Members list
      </h4>

      <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Membership
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Join date
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Edit
            </h5>
          </div>
         
        </div>


        { membersLoading &&
            <ColorRing wrapperClass="h-screen m-auto" colors={['#e15b64','#e15b64','#e15b64','#e15b64','#e15b64']}/>      
        }
    { members &&
      <div className="flex flex-col">
        {members.map((user: User) => (
          <MemberListEntry
            firstname={user.firstname}
            numberOfStripes={user.numberOfStripes}
            lastname={user.lastname}
            belt={user.belt as beltType}
            email={user.email}
            joinDate={user.createdAt}
          />
        ))}
      </div>
    }
    </div>
  );
};

