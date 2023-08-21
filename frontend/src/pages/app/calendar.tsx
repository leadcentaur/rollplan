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
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/utils/event-utils'
import Link from "next/link";
import AddEventModal, { EventType } from "@/components/app/form/calendar/AddEventModal";
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
import { ColorRing } from "react-loader-spinner";
import * as icons from "@/assets/NoGiIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [eventClickInfo, setEventClickInfo] = useState<EventClickArg>();

    const [errorText, setErrorText] = useState<string|undefined>(undefined);
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
            const calendarEvents = await EventsApi.getAcademyEvents(user?.academyReferenceId!, date.startStr, date.endStr);
            console.log("Fetched calendar events: " + calendarEvents);
            setCalendarEvents(calendarEvents);   
            setErrorText(undefined);

        } catch (error) {
            setErrorText("Failed to fetch academy events.")
        }
    }

    function handleEventClick(event: EventClickArg) {
        if (!userLoading && user?.userType=="Owner") {

            setShowEditEventModal(true);
        }
        console.log(event.event.extendedProps);
    }

    function handleEventContent(event: EventContentArg) {
        
        const extendedProps = event.event.extendedProps;
        const colourClassString = "bg-blue"

        return (
            <>

            <div className={"flex flex-row w-full w-full border text-white-500 border-red-200 rounded-md " + colourClassString}>
                <p></p>
                <div className="flex flex-col">
                    <b className="px-2 text-sm text-ellipsis">{event.timeText}</b>
                    <i className="px-2 text-sm text-ellipsis">{event.event.title}</i>
                </div>
                <div className="m-auto ml-none">
                    { colourClassString === "bg-blue" &&
                        <div>
                            <i>0/30</i>
                        </div>
    
                    }
                    { colourClassString != "bg-blue" &&
                        <div>
                            <i>0/30</i><Icon className="" icon={faUniformMartialArts}/>
                        </div>
                    }
                    
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
            setShowAddEventModal(false);
            setErrorText(undefined);

        } catch (error) {
            setErrorText("Failed to create event.")
        }
    }

    return !userLoading ? (
        <DefaultLayout>

            { showAddEventModal &&
                <AddEventModal 
                    isOpen={showAddEventModal}
                    onEventCreatedSuccessfully={() => {setShowAddEventModal(false)}}
                    onEventTitle={(title) => {setEventTitle(title)}}
                    onEventType={(type) => {setEventType(type)}}
                    onEventDescription={(eventDescription) => setEventDescription(eventDescription)}
                    calendarApi={calInfo!}  
                    selectedDate={startDate?.toISOString()!} 
                    onDismiss={() => {setShowAddEventModal(false); setCalInfo(undefined)}}
                />
            }



            <Breadcrumb pageName="Calendar" />

            {errorText &&
                 <ErrorAlert errorText={errorText} errorTextHeading="Error"/>            
            }
            <div className='demo-app'>
                <div className=''>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    eventBackgroundColor="green"
                    themeSystem="bootstrap 4"
                    contentHeight={800}
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
                    eventChange={function(){}}
                    eventRemove={function(){}}
                />
                </div>
            </div>
        </DefaultLayout>
    ): <ColorRing wrapperClass="h-screen m-auto" colors={['#e15b64','#e15b64','#e15b64','#e15b64','#e15b64']}/>;
  }
  