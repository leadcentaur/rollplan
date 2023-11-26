import { eventLogType } from "@/types/user-types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarCircleMinus, faCalendarPlus, faCalendars, faInfoCircle, faUniformMartialArts, faUserMinus, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const eventLogIcons: Record<eventLogType, IconProp> = {
    calendarEventNew: faCalendarPlus,
    calendarEventUpdate: faCalendars,
    calendarEventDelete: faCalendarCircleMinus,
    userAdded: faUserPlus,
    userRemoved: faUserMinus,
    beltPromotion: faUniformMartialArts
}

interface EventLogEventProps {
    eventLogEventType: eventLogType;
    eventLogTitleText?: string;
    eventLogSubtitleText?: string;
    logIndex?: number
}


export default function EventlogEvent({ eventLogEventType, eventLogSubtitleText, eventLogTitleText, logIndex }: EventLogEventProps) {
    return (
        <div className="flex flex-row items-center justify-between gap-4 p-4">

            <div className="flex flex-row items-center justift-content gap-4 p-1">
                <div className="h-14 w-14 rounded-full border border-stroke pl-1 flex items-center justify-center ">
                    <FontAwesomeIcon icon={eventLogIcons[eventLogEventType]} className="text-xl" />
                </div>
                <div className="flex row justify-content space-between">
                    <div className="flex flex-col">
                        <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{eventLogTitleText}&nbsp;&nbsp;</strong>
                        <span className="text-slate-500 text-sm font-medium dark:text-slate-400"> {eventLogSubtitleText}</span>
                    </div>
                </div>
            </div>
            <div>
                <FontAwesomeIcon className="text-lg text-center" icon={faInfoCircle} />
            </div>
        </div>
    );
}