import React from "react";
import Image from "next/image";
import profilePicPlaceholder from "../../../assets/images/profile-pic-placeholder.png";
import * as utils from "../../../utils/utils";
import Icon from "@/components/site/ui/iconography/Icon";
import { faGraduationCap, faPenToSquare, faTrashCan } from "@fortawesome/pro-solid-svg-icons";
import { beltType } from "@/types/user-types";
import clsx from "clsx";


interface MemberListItemProps { 
    firstname?: string,
    lastname?: string,
    belt?: beltType,
    numberOfStripes?: number,
    email?: string,
    profilePicUrl?: string,
    joinDate?: string,
}

const beltStylingMap: Record<beltType, string> = {
  
  white: "inline-flex rounded-full bg-gray  py-1 px-3 md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center text-xs font-medium",
  blue: "inline-flex rounded-full bg-blue py-1 px-3 md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center text-xs text-white-500 font-medium",
  purple: "inline-flex rounded-full bg-purple py-1 px-3  justify-center md:w-1/2 lg:w-1/2 xl:w-1/2 text-xs text-white-500 font-medium",
  brown: "inline-flex rounded-full bg-brown py-1 px-3 text-xs  justify-center md:w-1/2 lg:w-1/2 xl:w-1/2 text-white-500 font-medium",
  black: "inline-flex rounded-full bg-black-500 py-1 px-3 text-xs lg:w-1/2 xl:w-1/2 justify-center text-white-500 font-medium",

}

export default function MemberListEntry({firstname, lastname, belt, numberOfStripes, email, joinDate, profilePicUrl}: MemberListItemProps) {
    return (
      <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <Image src={profilePicPlaceholder} height={50} width={50} alt="Brand" className="rounded-full"/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">{firstname + " " + lastname}</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">

            { belt && numberOfStripes && joinDate &&
                
                <p className={beltStylingMap[belt]}>
                  {utils.capitalizeFirstLetter(belt) + " " + utils.romanize(numberOfStripes)}
                </p>

            }

          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3"></p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white text-sm italic">{utils.toHumanDate(joinDate!)}</p>
          </div>

          <div className="hidden items-center justify-center gap-2  p-2.5 sm:flex xl:p-5">
              <Icon icon={faPenToSquare} className="hover:text-meta-5 text-lg transition ease-in-out"/>
              <Icon icon={faGraduationCap} className="hover:text-meta-5 text-lg transition ease-in-out"/>
          </div>
        </div>
    );
}