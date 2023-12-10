import Spinner from "@/components/site/ui/typography/Spinner";
import LogEvent from "@/models/log-event";
import EventlogEvent from "./EventLogEvent";
import { eventLogType } from "@/types/user-types";
import useAcademyLog from "@/hooks/useAcademyLog";
import Heading from "@/components/site/ui/typography/Heading";
import WarningAlert from "./WarningAlert";


export default function EventLogList() {

    const { academyLog, academyLogLoading, academyLogLoadingError, mutateLogEvents } = useAcademyLog(); 

    return (
        <div className="col-span-12 h-72 overflow-auto rounded-md border border-stroke bg-white-500 p-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <Heading className="border-b border-stroke p-3" level={5}>
                Event log
            </Heading>
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

        { academyLog && (academyLog.length == 0) &&
            <div className="h-screen flex items-center justify-center text-siteGray-300">
                <Heading className="" level={5}>
                    This Acadademy doesn't have any log events yet
                </Heading>
            </div>
        }


            

            </div>
    );
}