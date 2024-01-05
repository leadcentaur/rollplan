import Breadcrumb from "@/components/app/components/Breadcrumb";
import MemberList from "@/components/app/components/MembersList";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import * as AcademyApi from "../../network/api/academys";
import PaginationBar from "@/components/app/buttons/Pagination/PaginationBar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import { MemberPage, User } from "@/models/user";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/network/http-errors";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as UsersApi from "@/network/api/users";
import useSWR from "swr";
import MemberListEntry from "@/components/app/components/MemberListEntry";
import { beltType } from "@/types/user-types";
import { useRouter } from "next/router";



export const getServerSideProps: GetServerSideProps<MemberPageProps> = async ({ query }) => {
  try {

    const academyId = query?.academyId?.toString() || "";
    const page = parseInt(query?.page?.toString() || "1");
    const data = await AcademyApi.getAcademyMembers(academyId, page);
    return {
      props: { data }
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { notFound: true }
    }
    if (error instanceof NotFoundError) {
      return { notFound: true }
    } else {
      throw error
    }
  }
}

interface MemberPageProps {
  data: MemberPage,
}


export default function Members( {data: { members, page, totalPages }}: MemberPageProps) {


  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Members" />
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

          { members && members.length != 0 &&
            <div>
              {members.map((user: User, index: number) => (
                <MemberListEntry
                  key={index}
                  memebrsLen={members.length}
                  firstname={user.firstname}
                  index={index}
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
        </div>
          
        <PaginationBar pageCount={totalPages} currentPage={page} onPageItemClicked={(page) => {
          router.push({ query: { ...router.query, page } });
        }} />

      </div>
    </DefaultLayout>
  );
}
1