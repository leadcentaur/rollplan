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
import CardOne from "@/components/app/components/DashboardCardOne"
import CardTwo from "@/components/app/components/DashboardCardTwo";
import CardThree from "@/components/app/components/DashboardCardThree";
import CardFour from "@/components/app/components/DashboardCardFour";
import ChartTwo from "@/components/app/components/AttendanceChart";
import AcademyEventQueue from "@/components/app/components/AcademyEventLog";
import Eventlog from "./log";
import EventlogEvent from "@/components/app/components/EventLogEvent";

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

    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.">
    {(typeof window !== 'undefined') &&
        <ChartTwo/>
    }
       <div className="overflow-auto hy-72 relative mx-auto bg-white-500 dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-2 ring-stroke rounded-xl flex flex-col divide-y divide-siteGray-100 dark:divide-slate-200/5">
                <EventlogEvent eventLogEventType="userAdded" eventLogTitleText="New member Joined!" eventLogSubtitleText="Daniel Yurisetti"/>
                <EventlogEvent eventLogEventType="calendarEventUpdate" eventLogTitleText="A calendar event has updated!" eventLogSubtitleText="BJJ Gi is now: Thursday september 3rd, 10:00am"/>
                <EventlogEvent eventLogEventType="calendarEventNew" eventLogTitleText="New calendar event" eventLogSubtitleText="BJJ No-Gi: Thursday september 3rd, 10:00am"/>
                <EventlogEvent eventLogEventType="beltPromotion" eventLogTitleText="Belt promotion!" eventLogSubtitleText="Fred Davies has been promoted to blue belt!"/>
            </div>
    </div>
  </>
    </DefaultLayout>
  );
}
