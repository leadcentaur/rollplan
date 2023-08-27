import LoginForm from "@/components/site/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

import DashboardAdmin from "@/components/app/pages/Dashboard/DashBoardAdmin";
import DashboardMember from "@/components/app/pages/Dashboard/DashBoardMember";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/router";
import Spinner from "@/components/site/ui/typography/Spinner";

export default function Dashboard() {

  const router = useRouter();
  const { user, userLoading } = useAuthenticatedUser();
  if (userLoading) return <Spinner/>
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
