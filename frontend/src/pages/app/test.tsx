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

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({params}) => {
  const username = params?.username?.toString();
  if (!username) throw Error("username missing");

  const user = await UsersApi.getUserByUsername(username);
  console.log("The username: " + user.username);
  return {
    props: { user }
  }
}

interface UserProfilePageProps {
  user: User,
}

  
export default function Members({user}: UserProfilePageProps) {  

  const { user: loggedInUser, mutateUser: mutateLoggedInUser } = useAuthenticatedUser();
  const [profileUser, setProfileUser] = useState(user);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Members!" />
            {JSON.stringify(loggedInUser?.username)}
  
        </DefaultLayout>
    );
  }
  1