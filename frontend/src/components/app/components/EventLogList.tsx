import Spinner from "@/components/site/ui/typography/Spinner";
import LogEvent from "@/models/log-event";
import EventlogEvent from "./EventLogEvent";
import { eventLogType } from "@/types/user-types";
import { LogEventPage } from "@/models/log-event";
import useAcademyLog from "@/hooks/useAcademyLog";
import Heading from "@/components/site/ui/typography/Heading";
import WarningAlert from "./WarningAlert";
import NavigationButton from "../buttons/PageNavigationButton";
import Icon from "@/components/site/ui/iconography/Icon";
import { faSquareStar } from "@fortawesome/pro-solid-svg-icons";
import clsx from "clsx";
import { useState } from "react";


export default function EventLogList() {

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const { academyLog, academyLogLoading, academyLogLoadingError, mutateLogEvents } = useAcademyLog({pageNumber: currentPageNumber});

    async function fetchLogEventsPage(page: number) {
        
    }
    
    return (

        <div className="rounded-md bg-white-500 border border-stroke text-md">
              <Heading className="flex items-stretch justify-between flex-row space-between gap-4 p-3 m-2 border-b border-stroke " level={5}>
                    <div className="flex mt-5">
                        <span className="">
                            Event Log
                        </span>
                        <span className="">
                            <Icon
                                icon={faSquareStar}
                                className={clsx('mb-6 ml-2')}
                                style={{ maxWidth: 54 }}
                            />
                        </span>
                    </div>
                    <div>
                    </div>
                    <div className="mt-5">

                
                        <NavigationButton currentPage={currentPageNumber} onNextClicked={() => {setCurrentPageNumber(currentPageNumber + 1)}} onPrevClicked={() => {setCurrentPageNumber(currentPageNumber - 1)}}/>
                    
                    </div>
                </Heading>
            <div className="col-span-12 h-72 overflow-auto rounded-md border-stroke bg-white-500 p-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                <div>
                { academyLogLoading &&
                    <Spinner/>        
                }


                { !academyLogLoading  &&
                    academyLog.logEvents.map((logEvent: LogEvent, index: number) => (
                        <EventlogEvent
                            key={index}
                            eventLogEventType={logEvent.eventType as eventLogType}
                            eventLogTitleText={logEvent.eventTitle}
                            eventLogSubtitleText={logEvent.eventSubtitle}
                    />
                    ))
                }
                </div>
            </div>
        </div>
    );
}