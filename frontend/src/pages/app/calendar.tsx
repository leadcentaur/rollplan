import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React, { useRef, useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  CalendarApi,
  EventAddArg,
  DatesSetArg,
  EventSourceInput,
  EventRemoveArg,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/utils/event-utils'
import Link from "next/link";
import CreateEventModal, { EventType } from "@/components/app/form/calendar/CreateEventModal";
import { useStyleRegistry } from "styled-jsx";
import { CalendarEvent } from "@/models/event";
import TestModal from "@/components/app/form/calendar/TestModal";
import * as EventsApi from "@/network/api/event";
import useAcademyEvents from "@/hooks/useAcademyEvents";
import ErrorAlert from "@/components/app/components/ErrorAlert";
import Spinner from "@/components/site/ui/typography/Spinner";
import { aC } from "@fullcalendar/core/internal-common";
import { title } from "process";
import { TemplateContext } from "next/dist/shared/lib/app-router-context";
import { EventInput } from '@fullcalendar/core'
import Icon from "@/components/site/ui/iconography/Icon";
import { faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import clsx from "clsx";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as icons from "@/assets/NoGiIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoGiIcon from "../../assets/images/NoGi.svg";
import { faGraduationCap } from "@fortawesome/pro-solid-svg-icons";
import ExampleModal from "@/components/app/form/calendar/CreateEventModal";
import { truncateString } from "@/utils/utils";
import EditEventModal from "@/components/app/form/calendar/EditEventModal";
import SuccessAlert from "@/components/app/components/SuccessAlert";
import MemberEventModal from "@/components/app/form/calendar/MemberEventModal";



interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default function Calendar({weekendsVisible, currentEvents}: CalendarState) {

    // const { academyEvents, academyEventsLoading, academyEventsLoadingError} = useAcademyEvents();
    const { user, userLoading, userLoadingError } = useAuthenticatedUser();
    const { academyEvents, academyEventsLoading, academyEventsLoadingError} = useAcademyEvents();

    const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
    const [showEditEventModal, setShowEditEventModal] = useState<boolean>(false);
    const [showMemberEventModal, setShowMemberEventModal] = useState<boolean>(false);

    const [eventClickInfo, setEventClickInfo] = useState<EventClickArg|undefined>();
    const [eventUpdatedText, setEventUpdatedText] = useState<string|undefined>();
    const [monthDateInfo, setMonthDateInfo] = useState<DatesSetArg|undefined>();

    const [errorText, setErrorText] = useState<string|undefined>(undefined);
    const [onEventCreatedSuccessfullyText, setOnEventCreatedSuccessfullyText] = useState<string|undefined>(undefined);

    const [eventCreationSuccess, setEventCreationSuccess] = useState<boolean|undefined>(undefined);
    const [eventTitle, setEventTitle] = useState<string|undefined>()
    const [eventDescription, setEventDescription] = useState<string|undefined>();
    const [eventType, setEventType] = useState<string|undefined>(undefined);

    const [calInfo, setCalInfo] = useState<CalendarApi|undefined>();
    const [startDate, setStartDate] = useState<Date>();
    const [calendarEvents, setCalendarEvents] = useState<EventInput[]>();
    const calendarRef = useRef("");

    async function handleDateSelect(selectinfo: DateSelectArg){
        if (!userLoading && user?.userType == "owner") {
            let calendarApi = selectinfo.view.calendar;
            setCalInfo(calendarApi);
            setStartDate(selectinfo.start)
            setShowAddEventModal(true);
        } else {
            return null;
        }
    }

    async function handleDatesSet(date: DatesSetArg) {
        try {
            setMonthDateInfo(date);
            const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, date.startStr, date.endStr);
            console.log("Fetched calendar events for: " + date.startStr + " to: " + date.endStr);
            setCalendarEvents(calendarEvents);   
            setErrorText(undefined);

        } catch (error) {
            setErrorText("Failed to fetch academy events.")
        }
    }

    function handleEventClick(event: EventClickArg) {

            if (user?.userType == "owner") {
                setEventClickInfo(event);
                setShowEditEventModal(true);
            } else if (user?.userType == "member") {
                setEventClickInfo(event);
                setShowMemberEventModal(true);
            } else {
                return null;
            }
    
    }

    async function handleEventRemoval(eventToRemove: EventRemoveArg) {

        if (monthDateInfo?.startStr && monthDateInfo?.endStr) {

            const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, monthDateInfo.startStr, monthDateInfo.endStr);
            console.log("Fetched calendar events for: " + monthDateInfo.startStr + " to: " + monthDateInfo.endStr);
            setCalendarEvents(calendarEvents);   

            console.log("Removed event: " + eventToRemove.event.title);
            setErrorText(undefined);

        } else {
            setErrorText("Unable to remove event.")
        }
        
    }



    function handleEventContent(event: EventContentArg) {
        
        let colourClassString = ""
        let newTitleStr: string | undefined = undefined
        const eventType = event.event.extendedProps.type;
        if (event.event.title.length > 12) {
            newTitleStr = truncateString(event.event.title, 19)!;
        }

        if (eventType.toLowerCase().includes("No-Gi".toLocaleLowerCase())) {
            colourClassString = "bg-nogiclass"
        } else if (eventType == "Seminar") {
            colourClassString = "bg-seminar"
        } else {
            colourClassString = "bg-giclass"
        }
    

        return (
            <>
                <div className={"flex flex-row w-full px-1  border text-white-500 border-red-200 rounded-md text-ellipsis " + colourClassString}>

                <div className="absolute ">                    
                        <div className={colourClassString}>
                            <i className="">0/30</i>
                            { colourClassString == "bg-nogiclass" &&
                            <span className="inline-block ml-2 pt-1"><NoGiIcon/></span>
                                
                            }
                            { colourClassString == "bg-giclass" &&
                                <Icon className="ml-1" icon={faUniformMartialArts}/>
                            }
                            { colourClassString == "bg-seminar" &&  
                                <Icon className="ml-1" icon={faGraduationCap}/>
                            }
                        </div>
    
                </div>
                <div className="flex flex-col text-white-500">
                    <b className=" text-sm">{event.timeText}</b>
                    <i className=" text-sm ">{newTitleStr||event.event.title}</i>
                </div>

            </div>
            </>
        )
    }

    async function handleEventAdd(event: EventAddArg) {
        try {
            const eventObject = {
                title: event.event.title,
                description: event.event.extendedProps.description,
                type: event.event.extendedProps.type,
                start: event.event.startStr,
                end: event.event.endStr,
                referenceId: event.event.extendedProps.referenceId,
            } as EventsApi.CreateEventProps
    
            const newEvent = await EventsApi.createEvent(eventObject);
            const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, monthDateInfo?.startStr!, monthDateInfo?.endStr!);
            setCalendarEvents(calendarEvents);
            
            setShowAddEventModal(false);
            setOnEventCreatedSuccessfullyText("Event created succesfully")
            setErrorText(undefined);

        } catch (error) {
            setErrorText("Failed to create event.")
        }
    }

    return !userLoading && user ? (
        <DefaultLayout>

            { showAddEventModal && user?.academyReferenceId &&
                <CreateEventModal
                    isOpen={showAddEventModal}
                    onEventCreatedSuccessfully={() => {setShowAddEventModal(false)}}
                    referenceId={user.academyReferenceId}
                    calendarApi={calInfo!}  
                    selectedDate={startDate?.toISOString()!} 
                    onDismiss={() => {setShowAddEventModal(false); setCalInfo(undefined)}}
                />
            }

            { showEditEventModal && user.academyReferenceId && 
                <EditEventModal
                    onEventDeleted={() => {setEventUpdatedText("Event had been deleted successfully"); setShowEditEventModal(false)}}
                    onEventUpdated={(text) => {setEventUpdatedText(text)}}
                    editEventClickArg={eventClickInfo!}
                    onDismiss={() => {setShowEditEventModal(false)}}
                    isOpen={showEditEventModal}
                />
            }

            { showMemberEventModal && user.academyReferenceId &&
                <MemberEventModal
                    isOpen={showMemberEventModal}
                    editEventClickArg={eventClickInfo!}
                    onDismiss={() => setShowMemberEventModal(false)}
                />
                
            }



            <Breadcrumb pageName="Calendar" />

                {errorText &&
                    <ErrorAlert errorText={errorText} errorTextHeading="Error"/>           
                }

                { eventUpdatedText &&
                    <SuccessAlert successText={eventUpdatedText} successTextHeading="Event updated"/>
                }

                { onEventCreatedSuccessfullyText &&
                    <SuccessAlert successText={onEventCreatedSuccessfullyText} successTextHeading="Event created "/>
                }

            <div className='demo-app ' >
                <div className='overflow-hidden .fc-timeline-event overflow-hidden'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                    aspectRatio={1.4}

                    headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    // eventDidMount={(event) => {console.log(event.event.extendedProps)}}
                selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={calendarEvents}
                    weekends={true}
                    select={handleDateSelect}
                    eventContent={(event) => handleEventContent(event)} // custom render function
                    eventClick={handleEventClick}
                    //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    datesSet={date => handleDatesSet(date)}
                    eventAdd={event => handleEventAdd(event)}
                    eventRemove={event => {handleEventRemoval(event)}}
                />
                </div>
            </div>
        </DefaultLayout>
    ): <Spinner/>
  }
  