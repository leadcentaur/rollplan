import LoginForm from "@/components/site/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

import DefaultLayout from "@/components/app/layout/DefaultLayout";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/router";
import Spinner from "@/components/site/ui/typography/Spinner";
import CardOne from "@/components/app/components/DashboardCardOne"
import CardTwo from "@/components/app/components/DashboardCardTwo";
import CardThree from "@/components/app/components/DashboardCardThree";
import CardFour from "@/components/app/components/DashboardCardFour";
import ChartTwo from "@/components/app/components/AttendanceChart";
import AcademyEventQueue from "@/components/app/components/AcademyEventLog";
import Eventlog from "./log";
import EventlogEvent from "@/components/app/components/EventLogEvent";
import EventLogList from "@/components/app/components/EventLogList";
import MemberList from "@/components/app/components/MembersList";
import TableOne from "@/components/app/components/TableOne";
import ChatCard from "@/components/app/components/ChatCard";
import CardFive from "@/components/app/components/CardFive";
import CardSix from "@/components/app/components/CardSix";
import CardSeven from "@/components/app/components/CardSeven";
import CardEight from "@/components/app/components/CardEight";


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
      <CardFive/>
      <CardSix/>
      <CardSeven/>
      <CardEight/>                                                                                                                           
    </div>

    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
    <div className="col-span-12 xl:col-span-8">
          <EventLogList/>
        </div>
    </div>
  </>
    </DefaultLayout>
  );
}
