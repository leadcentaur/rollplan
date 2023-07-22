import React from "react";
import Image from "next/image";
import * as utils from "../../../utils/utils";
import Icon from "@/components/site/ui/iconography/Icon";
import { faGraduationCap, faPenToSquare, faTrashCan } from "@fortawesome/pro-solid-svg-icons";
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png'
import { beltType } from "@/types/user-types";
import clsx from "clsx";
import { utimesSync } from "fs";


interface MemberListItemProps { 
    firstname?: string,
    lastname?: string,
    belt?: beltType,
    numberOfStripes?: number,
    email?: string,
    profilePicUrl?: string,
    joinDate?: string,
    memebrsLen?: number
}

const beltStylingMap: Record<beltType, string> = {
  
  white: "inline-flex rounded-full bg-siteGray-100 py-1 px-3 lg:w-auto justify-center text-black-500 text-xs font-medium",
  blue: "inline-flex rounded-full bg-blue py-1 px-3 lg:w-auto justify-center text-white-500 text-xs font-medium",
  purple: "inline-flex rounded-full bg-purple py-1 px-3 lg:w-auto justify-center text-white-500 text-xs font-medium",
  brown: "inline-flex rounded-full bg-brown py-1 px-3 lg:w-auto justify-center text-white-500 text-xs font-medium",
  black: "inline-flex rounded-full bg-black-500 py-1 px-3 lg:w-auto justify-center text-white-500 text-xs font-medium",

}

export default function MemberListEntry({firstname, lastname, belt, numberOfStripes, email, joinDate, profilePicUrl}: MemberListItemProps) {
    return (
      <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
        <div className="flex items-center gap-3 p-2.5 xl:p-5">
          <div className="flex-shrink-0">
            <Image alt="user profile pic" src={profilePicUrl || profilePicPlaceholder} height={50} width={50} className="rounded-full"/>

            </div>
              <p className="text-black dark:text-white sm:block text-xs lg:text-base">
                {firstname && lastname &&
                  <p>{utils.capitalizeFirstLetter(firstname) + ' ' + utils.capitalizeFirstLetter(lastname)}</p>
                }
                { (!firstname || !lastname) &&
                  <p className="italic">N/A</p>
                }
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              { belt && numberOfStripes &&
                  <p className={beltStylingMap[belt]}>{
                    utils.capitalizeFirstLetter(belt) +
                    ' ' +
                    utils.romanize(numberOfStripes)
                  }</p>
              }
              { (!belt || !numberOfStripes) &&
                  <p className="italic">N/A</p>
              }
            </div>

            <div className="hidden flex items-center justify-center p-2.5 xl:p-5 sm:flex">
              {/* <p className="text-meta-3">$5,768</p> */}
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {/* <p className="text-black dark:text-white">590</p> */}
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="">
                <Icon icon={faPenToSquare} className="py-5 text-2xl" height={50} width={50}/>
              </p>
            </div>
    </div>
    );
}