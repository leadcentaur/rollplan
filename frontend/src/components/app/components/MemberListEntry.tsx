import React from "react";
import Image from "next/image";
import * as utils from "../../../utils/utils";
import Icon from "@/components/site/ui/iconography/Icon";
import { faGraduationCap, faPenToSquare, faTrashCan } from "@fortawesome/pro-solid-svg-icons";
import profilePicPlaceholder from '@/assets/images/placeholders/profile-pic-placeholder.png'
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
              
                <Icon icon={faPenToSquare} className="py-5 text-2xl hover:text-red-500 transition ease-in-out" height={50} width={50}/>
                <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-success transition ease-in-out" height="1.4em" viewBox="0 0 640 512"><path d="M0 144L320 32c106.7 37.3 213.3 74.7 320 112c0 10.7 0 21.3 0 32c-26.7 9.3-53.4 18.7-80 28c-19.8-7.8-41.4-12-64-12c-65 0-121.8 35.3-152.3 87.7c-7.9 2.8-15.8 5.5-23.7 8.3c-64.1-22.4-128.1-44.9-192.2-67.3c66-25.9 132.1-51.9 198.1-77.8c5-2 9.9-3.9 14.9-5.9c-3.9-9.9-7.9-19.8-11.8-29.7c-5 2-9.9 3.9-14.9 5.9c-74.7 29.3-149.3 58.7-224 88c-2.9 1.1-5.8 2.3-8.7 3.4c-.5-.2-.9-.4-1.4-.6c0 47.6 0 95.2 0 142.8c15.4 25.1 27.8 68.4 0 133.2c-26.7-5.3-53.3-10.7-80-16c0 0 32.5-46.5 48-96.9c0-58.1 0-116.2 0-174.3C32 187.2 16 181.6 0 176c0-10.7 0-21.3 0-32zM128 408l15.6-147.8c55.3 19.4 110.6 38.7 165.9 58.1c3.5 1.2 7.1 2.5 10.6 3.7c2.2-.8 4.4-1.5 6.6-2.3C322.3 335 320 351.2 320 368c0 41.8 14.6 80.1 38.9 110.3c-12.6 1.1-25.6 1.7-38.9 1.7c-106 0-192-36.7-192-72zm224-40c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm64-16l0 32c21.3 0 42.7 0 64 0c0 21.3 0 42.7 0 64c10.7 0 21.3 0 32 0c0-21.3 0-42.7 0-64c21.3 0 42.7 0 64 0c0-10.7 0-21.3 0-32l-64 0c0-21.3 0-42.7 0-64c-10.7 0-21.3 0-32 0c0 21.3 0 42.7 0 64c-21.3 0-42.7 0-64 0z"/></svg>

            </div>
    </div>
    );
}