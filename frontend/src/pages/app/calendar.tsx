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
  EventDropArg,
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
import { ref } from "yup";



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
    const [onEventRegisteredSuccess, setOnEventRegisteredSuccess] = useState<string|undefined>(undefined);

    const [eventCreationSuccess, setEventCreationSuccess] = useState<boolean|undefined>(undefined);
    const [eventTitle, setEventTitle] = useState<string|undefined>()
    const [eventDescription, setEventDescription] = useState<string|undefined>();
    const [eventType, setEventType] = useState<string|undefined>(undefined);
   

    const [calInfo, setCalInfo] = useState<CalendarApi|undefined>();
    const [startDate, setStartDate] = useState<Date>();
    const [calendarEvents, setCalendarEvents] = useState<EventInput[]>();

    const fullCalendar: React.LegacyRef<FullCalendar> = React.createRef()

    async function handleDateSelect(selectinfo: DateSelectArg){
        
        let calendarApi = selectinfo.view.calendar;
            setCalInfo(calendarApi);
            selectinfo.view.calendar.refetchEvents();
            setStartDate(selectinfo.start)

        if (!userLoading && user?.userType == "owner") {
            setShowAddEventModal(true);
        } else {
            return null;
        }
    }

    async function handleDatesSet(date: DatesSetArg) {
        try {   
            
            setMonthDateInfo(date);
            setCalendarEvents(undefined);
            date.view.calendar.refetchEvents();

            const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, date.startStr, date.endStr);
            console.log("Fetched calendar events for: " + date.startStr + " to: " + date.endStr);
            setCalendarEvents(calendarEvents);   
            setErrorText(undefined);

        } catch (error) {
            setErrorText("Failed to fetch academy events.")
        }
    }

    function handleEventClick(event: EventClickArg) {

            console.log("Extended props: " + JSON.stringify(event.event.extendedProps));

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
        try {
            if (monthDateInfo?.startStr && monthDateInfo?.endStr) {
                const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, monthDateInfo.startStr, monthDateInfo.endStr);
                console.log("Fetched calendar events for: " + monthDateInfo.startStr + " to: " + monthDateInfo.endStr);
                setCalendarEvents(calendarEvents);   
    
                console.log("Removed event: " + eventToRemove.event.title);
                setErrorText(undefined);
    
            } else {
                setErrorText("There was an error removing the event. Please try again later")
            }    
        } catch (error) {
             setErrorText("There was an error removing the event. Please try again later")
        }
        
    }

    async function handleEventSet(events: EventApi[]) {
        console.log("Events from Event set: " + JSON.stringify(events))
    }

    async function handleEventChange() {

    }

    async function handleEventDrop(event: EventDropArg) {
        try {
            const backendEventId = event.event.extendedProps._id;
            if (!backendEventId) {
                return null;
            } 
            const updateDropedEvent = await EventsApi.updateCalendarEvent({start: event.event.startStr, end: event.event.endStr}, backendEventId);
            event.event.remove();   
        } catch (error) {
            setErrorText("Unable to update event. Please try again")
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
                <div className={"flex flex-row w-full px-1 border text-white-500 border-red-200 rounded-md text-ellipsis " + colourClassString}>

                <div className="absolute ">                    
                        <div className={colourClassString}>
                            <i className="">{event.event.extendedProps.registerCount||0}/30</i>
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
                    <b className="">{event.timeText}</b>
                    <i className=" text-sm ">{event.timeText} {"→"} {newTitleStr||event.event.title}</i>
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
                location: event.event.extendedProps.location,
                start: event.event.startStr,
                end: event.event.endStr,
                referenceId: event.event.extendedProps.referenceId,
                registerCount: event.event.extendedProps.registerCount,
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
                    onDismiss={() => {setShowAddEventModal(false); setCalInfo(undefined);}}
                />
            }

            { showEditEventModal && user.academyReferenceId && 
                <EditEventModal
                    onEventDeleted={() => {setEventUpdatedText("Event had been deleted successfully"); setShowEditEventModal(false); calInfo?.refetchEvents();}}
                    onEventUpdated={(text) => {setEventUpdatedText(text)}}
                    editEventClickArg={eventClickInfo!}
                    onDismiss={() => {setShowEditEventModal(false);}}
                    isOpen={showEditEventModal}
                />
            }

            { showMemberEventModal && user.academyReferenceId &&
                <MemberEventModal
                    onEventRegister={() => {}}
                    isOpen={showMemberEventModal}
                    calendar={calInfo!}
                    editEventClickArg={eventClickInfo!}
                    onDismiss={() => {setShowMemberEventModal(false);}}
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

                { onEventRegisteredSuccess &&
                    <SuccessAlert successText={onEventRegisteredSuccess} successTextHeading="Success"/>
                }

            <div className='demo-app bg-white-500 p-5 rounded-xl' >
                <div className='overflow-hidden .fc-timeline-event overflow-hidden'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    aspectRatio={1.4}
                    ref={fullCalendar}
                    headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    eventDrop={(event) => handleEventDrop(event)}
                    // eventDidMount={(event) => {console.log(event.event.extendedProps)}}
                selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={calendarEvents}
                    weekends={true}
                    select={handleDateSelect}
                    eventContent={(event) => handleEventContent(event)} // custom render function
                    eventClick={handleEventClick}
                    eventChange={handleEventChange}
                    eventsSet={(events) => handleEventSet(events)} // called after events are initialized/added/changed/removed
                    datesSet={date => handleDatesSet(date)}
                    eventAdd={event => handleEventAdd(event)}
                    eventRemove={event => {handleEventRemoval(event)}}
                />
                </div>
            </div>
        </DefaultLayout>
    ): <Spinner/>
  }
  