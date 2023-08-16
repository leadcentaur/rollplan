import LoginForm from "@/components/site/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

import DashboardAdmin from "@/components/app/pages/Dashboard/DashBoardAdmin";
import DashboardMember from "@/components/app/pages/Dashboard/DashBoardMember";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/router";

export default function Dashboard() {

  const router = useRouter();
  const { user, userLoading } = useAuthenticatedUser();
  if (userLoading) return <ColorRing wrapperClass="h-screen m-auto" colors={['#e15b64','#e15b64','#e15b64','#e15b64','#e15b64']}/>
  if (!user) {
    router.push("/login");
  }

  return (
    <DefaultLayout>
      <div className="">
       
      </div>
    </DefaultLayout>
  );
}
