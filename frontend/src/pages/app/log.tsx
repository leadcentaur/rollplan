import Breadcrumb from "@/components/app/components/Breadcrumb";
import EventlogEvent from "@/components/app/components/EventLogEvent";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import useAcademyLog from "@/hooks/useAcademyLog";
import { faInfoCircle, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogEvent, { LogEventPage } from "../../models/log-event";
import { eventLogType } from "@/types/user-types";
import { GetServerSideProps } from "next";
import Spinner from "@/components/site/ui/typography/Spinner";
import EventLogList from "@/components/app/components/EventLogList";
import { getLogEvents } from "@/network/api/log-event";
import * as LogEventApi from "@/network/api/log-event";


export default function Eventlog() {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Event log"/>
            <EventLogList/>
    </DefaultLayout>
    );


}