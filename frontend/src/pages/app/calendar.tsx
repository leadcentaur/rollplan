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
import AddEventModal from "@/components/app/form/calendar/AddEventModal";
import { useStyleRegistry } from "styled-jsx";
import { CalendarEvent, TempEvent } from "@/models/event";
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
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default function Calendar({weekendsVisible, currentEvents}: CalendarState) {

    // const { academyEvents, academyEventsLoading, academyEventsLoadingError} = useAcademyEvents();
    const { user, userLoading, userLoadingError } = useAuthenticatedUser();
    const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
    const [eventCreationSuccess, setEventCreationSuccess] = useState<boolean|undefined>(undefined);

    const [eventTitle, setEventTitle] = useState<string|undefined>("")
    const [eventDescription, setEventDescription] = useState<string|undefined>("");
    const [calInfo, setCalInfo] = useState<CalendarApi|undefined>();
    const [startDate, setStartDate] = useState<Date>();
    const [calendarEvents, setCalendarEvents] = useState<EventInput[]>();
    const calendarRef = useRef("");

    async function handleDateSelect(selectinfo: DateSelectArg){
    
      let calendarApi = selectinfo.view.calendar;
      setCalInfo(calendarApi);
      setStartDate(selectinfo.start)
      setShowAddEventModal(true);
    }

    async function handleDatesSet(date: DatesSetArg) {

        console.log("Dates set fired")
        const calendarEvents = await EventsApi.getAcademyEvents("64cb1f4652e0fd8ebe5c7c16", date.startStr, date.endStr);
        setCalendarEvents(calendarEvents);
    }

    function handleEventContent(event: EventContentArg) {

        event.event.setProp("eventType","")

        return (
            <>
            <div className="flex flex-row w-full w-full border bg-red-500 text-white-500 border-red-200 rounded-md">
                <div className="flex flex-col">
                    <b className="px-2">{event.timeText}</b>
                    <i className="px-2">{event.event.title}</i>
                </div>
                <div className="m-auto ml-9">
                    <i>0/30</i><Icon className="px-1" icon={faUniformMartialArts}/>
                </div>
            </div>
            </>
        )
    }

    async function handleEventAdd(event: EventAddArg) {
        
        const eventObject = {
            eventName: event.event.title,
            eventDescription: eventDescription,
            startDate: event.event.startStr,
            endDate: event.event.endStr,
            academyReferenceId: "64cb1f4652e0fd8ebe5c7c16"
        } as EventsApi.CreateEventProps

        const newEvent = await EventsApi.createEvent(eventObject);
        alert("New event created: " + newEvent);
        console.info(newEvent);
    }

    return  (
        <DefaultLayout>

            { showAddEventModal &&
                <AddEventModal 
                    isOpen={showAddEventModal}
                    onEventTitle={(eventName) => {setEventTitle(eventName)}}
                    onEventDescription={(eventDescription) => setEventDescription(eventDescription)}
                    calendarApi={calInfo!}  
                    selectedDate={startDate?.toISOString()!} 
                    onDismiss={() => {setShowAddEventModal(false); setCalInfo(undefined)}}
                />
            }



            <Breadcrumb pageName="Calendar" />



            <div className='demo-app'>
                <div className=''>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    aspectRatio={2}
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
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={calendarEvents}
                    weekends={true}
                    select={handleDateSelect}
                    eventContent={(event) => handleEventContent(event)} // custom render function
                    // eventClick={this.handleEventClick}
                    //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    datesSet={date => handleDatesSet(date)}
                    eventAdd={event => handleEventAdd(event)}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                />
                </div>
            </div>
        </DefaultLayout>
    );
  }
  