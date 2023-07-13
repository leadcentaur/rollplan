import React from "react";
import Image from "next/image";
import profilePicPlaceholder from "../../../assets/images/profile-pic-placeholder.png";
import * as utils from "../../../utils/utils";

interface MemberListItemProps {
    firstname: string,
    lastname: string,
    belt: string,
    numberOfStripes: number,
    email: string,
    profilePicUrl: string,
}

export default function MemberListEntry({firstname, lastname, belt, numberOfStripes, email, profilePicUrl}: MemberListItemProps) {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <Image src={profilePicPlaceholder || profilePicUrl } className="rounded-full" alt="Brand" height={50} width={50}/>
            </div>
            <p className="hidden text-black dark:text-white sm:block">
              {utils.capitalizeFirstLetter(firstname) + " " + utils.capitalizeFirstLetter(lastname)}
            </p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{belt}</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">{ numberOfStripes }</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">{email}</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">4.8%</p>
          </div>
        </div>
    );
}