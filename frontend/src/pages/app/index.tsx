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
import CardOne from "@/components/app/components/DashBoardCardOne";
import CardTwo from "@/components/app/components/DashBoardCardTwo";
import CardThree from "@/components/app/components/DashboardCardThree";
import CardFour from "@/components/app/components/DashboardCardFour";

export default function Dashboard() {

  const router = useRouter();
  const { user, userLoading } = useAuthenticatedUser();
  if (userLoading) return <Spinner/>
  if (!user) {
    router.push("/login");
  }

  return (
    <DefaultLayout>
       <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
    </div>

    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
  
    </div>
  </>
    </DefaultLayout>
  );
}
