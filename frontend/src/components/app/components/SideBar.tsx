import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faCalendarArrowDown, faCalendarUsers, faCog, faDashboard, faDoorOpen, faGridHorizontal, faListUl, faMoneyCheckDollarPen, faTableColumns, faUsers } from "@fortawesome/pro-solid-svg-icons";
import Icon from "@/components/site/ui/iconography/Icon";
import clsx from "clsx";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useRef, useState } from "react";
import UsersPlus from "../../../assets/images/solid-user-circle-plus.svg";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
  }

export default function SideBar({sidebarOpen, setSidebarOpen}: SidebarProps) {

    const router = useRouter();
    const pathname = router.pathname;

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const [memberDropdownSate, setMemberDropdownState] = useState(false);

    const [sidebarExpanded, setSidebarExpanded] = useState(
      typeof window !== "undefined" ? localStorage.sidebarExpanded : false
    );
    
    return (
        <aside
        className={`absolute left-0 top-0 z-9999 w-72.5 flex h-screen flex-col overflow-y-hidden bg-gradient-to-b from-slate-900 to-slate-600 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        
        <div className="flex items-center justify-between gap-2 px-7 py-5.5 lg:py-6.5">
            <Link href="/app">
                        <Image
                            src="https://i.imgur.com/akxtDmO.png"
                            alt="Flow Blog logo"
                            className='lg:ml-r-5l mb-1 mt-5 lg:absolute lg:-translate-y-8'
                            width={220}
                            height={100}
                        />
            </Link>
            
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">

              <Link href="/app" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out rounded-lg hover:bg-graydark dark:hover:bg-meta-4">                   
                        <Icon
													icon={faTableColumns}
													className={clsx(' pr-1 ml-1 justify-center flex')}
													style={{ maxWidth: 54 }}
												/>
                        <span className="m-0">
                          Dashboard
                        </span>
              </Link>

              <Link href="/app/calendar" className="group relative mr-1 flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                        <Icon
													icon={faCalendarUsers}
													className={clsx('text-1xl justify-center flex')}
													style={{ maxWidth: 54 }}
												/>
                        <span>
                          Calendar
                        </span>
              </Link>

              <Link href="/app/billing" className="group relative mr-1 flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                        <Icon
													icon={faMoneyCheckDollarPen}
													className={clsx('text-1xl justify-center flex')}
													style={{ maxWidth: 54 }}
												/>
                        <span>
                          Billing
                        </span>
              </Link>

             

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/app/members"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMemberDropdownState(!memberDropdownSate);
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <Icon
													icon={faUsers}
													className={clsx('text-1xl justify-center flex')}
													style={{ maxWidth: 54 }}
												/>
                          Members
                        <Icon icon={faAngleUp} className={clsx(!memberDropdownSate ? "text-white-500 rotate-0 transition ease-in-out duration-100" : "text-white-500 rotate-180 transition ease-in-out duration-100")}/>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !memberDropdownSate && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Icon
                              icon={faListUl}
                              style={{ maxWidth: 54 }}
                              className="mr-3 text-bodydark2"
                            />
                            <Link
                              href="/app/members"
                              className="text-bodydark2 duration-30]0 ease-in-out hover:text-white-300"
                            >
                              Members list  
                            </Link>
                          </li>
                          <li>
                            
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              
                <h3 className="mb-3 mt-3 ml-4 text-sm font-semibold text-bodydark2">
                  OTHER
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                    <Link href="/app/settings" className="group relative mr-1 flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                        <Icon
													icon={faCog}
													className={clsx('text-1xl justify-center flex')}
													style={{ maxWidth: 54 }}
												/>
                        <span>
                          Settings
                        </span>
                    </Link>

                    <Link href="/app/onboarding" className="group relative mr-0 flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" width={20} viewBox="0 0 640 512"><path d="M0 482.3C0 498.7 13.3 512 29.7 512c121.7 0 243.4 0 365.1 0C349.6 480.1 320 427.5 320 368c0-18.9 3-37.1 8.5-54.1c-18.4-6.4-38.2-9.9-58.8-9.9c-30.5 0-60.9 0-91.4 0C79.8 304 0 383.8 0 482.3zM113.1 64c-22.9 39.6-22.9 88.4 0 128s65.1 64 110.9 64s88-24.4 110.9-64s22.9-88.4 0-128S269.7 0 224 0s-88 24.4-110.9 64zM352 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144s-144 64.5-144 144zm64 0c0-8.8 7.2-16 16-16c16 0 32 0 48 0c0-16 0-32 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16c0 16 0 32 0 48c16 0 32 0 48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16c-16 0-32 0-48 0c0 16 0 32 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-16 0-32 0-48c-16 0-32 0-48 0c-8.8 0-16-7.2-16-16z"/></svg>
                        <span>
                          Onboarding
                        </span>
                    </Link>

                </ul>



            </ul>
        </div>
        </nav>
        </div>
      </aside>
    );
}