import ProfilePicPlaceholder from "../../../assets/images/profile-pic-placeholder.png"
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
          <ColorRing wrapperClass="h-1/2 m-auto" colors={['#e15b64','#e15b64','#e15b64','#e15b64','#e15b64']}/>      
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
        

        {/* <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
            <Image alt="user profile pic" src={ProfilePicPlaceholder} height={50} width={50} className="rounded-full"/>

            </div>
            <p className="text-black dark:text-white sm:block">Google</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="inline-flex rounded-full bg-purple py-1 px-3 lg:w-auto justify-center text-white-500 text-xs font-medium">Purple III</p>
          </div>

          <div className="hidden flex items-center justify-center p-2.5 xl:p-5 sm:flex">
            <p className="text-meta-3">$5,768</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">590</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">4.8%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
            <Image alt="user profile pic" src={ProfilePicPlaceholder} height={50} width={50} className="rounded-full"/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">
              Twitter
            </p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">2.2K</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$4,635</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">467</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">4.3%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
            <Image alt="user profile pic" src={ProfilePicPlaceholder} height={50} width={50} className="rounded-full"/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">Github</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">2.1K</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$4,290</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">420</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">3.7%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
            <Image alt="user profile pic" src={ProfilePicPlaceholder} height={50} width={50} className="rounded-full"/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">Vimeo</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">1.5K</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$3,580</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">389</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">2.5%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <Image alt="user profile pic" src={ProfilePicPlaceholder} height={50} width={50} className="rounded-full"/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">
              Facebook
            </p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">1.2K</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$2,740</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">230</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">1.9%</p>
          </div>
        </div> */}

      </div>
    </div>
  ) : 
  
    <div className="w-full h-screen m-auto v-screen justify-content">
      <div className="h-screen v-screen m-auto w-full">
        <p className="">⚠️ There was an error loading the academy members.</p>
      </div>
    </div>
};

