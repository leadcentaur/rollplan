import Breadcrumb from "@/components/app/components/Breadcrumb";
import EventlogEvent from "@/components/app/components/EventLogEvent";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import useAcademyLog from "@/hooks/useAcademyLog";
import { faInfoCircle, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogEvent from "../../models/log-event";
import { eventLogType } from "@/types/user-types";
import Spinner from "@/components/site/ui/typography/Spinner";


export default function Eventlog() {

    const { academyLog, academyLogLoading, academyLogLoadingError, mutateLogEvents } = useAcademyLog(); 

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Event log"/>
            <div className="overflow-auto h-auto relative mx-auto bg-white-500 dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-2 ring-stroke rounded-xl flex flex-col divide-y divide-siteGray-100 dark:divide-slate-200/5">

            { academyLogLoading &&
                <Spinner/>        
            }

      { academyLog && academyLog.length != 0 &&

          <div>
          {academyLog.map((logEvent: LogEvent , index: number) => (
            <EventlogEvent
                key={index}
                eventLogEventType={logEvent.eventType as eventLogType}
                eventLogTitleText={logEvent.eventTitle}
                eventLogSubtitleText={logEvent.eventSubtitle}
            />
          ))}
          </div>
      }
            

            </div>
    </DefaultLayout>
    );


}