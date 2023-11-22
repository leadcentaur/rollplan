import Breadcrumb from "@/components/app/components/Breadcrumb";
import EventlogEvent from "@/components/app/components/EventLogEvent";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import { academyEvent } from "@/types/user-types";
import { faInfoCircle, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Eventlog() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Event log"/>
            <div className="overflow-auto h-72 relative mx-auto bg-white-500 dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-2 ring-stroke rounded-xl flex flex-col divide-y divide-siteGray-100 dark:divide-slate-200/5">
                <EventlogEvent eventLogEventType="userAdded" eventLogTitleText="New member Joined!" eventLogSubtitleText="Daniel Yurisetti"/>
                <EventlogEvent eventLogEventType="calendarEventUpdate" eventLogTitleText="A calendar event has updated!" eventLogSubtitleText="BJJ Gi is now: Thursday september 3rd, 10:00am"/>
                <EventlogEvent eventLogEventType="calendarEventNew" eventLogTitleText="New calendar event" eventLogSubtitleText="BJJ No-Gi: Thursday september 3rd, 10:00am"/>
                <EventlogEvent eventLogEventType="beltPromotion" eventLogTitleText="Belt promotion!" eventLogSubtitleText="Fred Davies has been promoted to blue belt!"/>
            </div>
    </DefaultLayout>
    );

}
