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
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/utils/event-utils'
import Link from "next/link";
import AddEventModal from "@/components/app/form/calendar/AddEventModal";
import { useStyleRegistry } from "styled-jsx";
import { Event } from "@/models/event";
import TestModal from "@/components/app/form/calendar/TestModal";
import * as EventsApi from "@/network/api/event";
import useAcademyEvents from "@/hooks/useAcademyEvents";
import ErrorAlert from "@/components/app/components/ErrorAlert";
import Spinner from "@/components/site/ui/typography/Spinner";

interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default function Calendar({weekendsVisible, currentEvents}: CalendarState) {

    const { academyEvents, academyEventsLoading, academyEventsLoadingError} = useAcademyEvents();
    
    const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
    const [eventTitle, setEventTitle] = useState<string|undefined>("")
    const [eventDescription, setEventDescription] = useState<string|undefined>("");
    const [startDate, setStartDate] = useState<Date>();
    const [calInfo, setCalInfo] = useState<CalendarApi|undefined>();
    const [calendarEvents, setCalendarEvents] = useState<Event>();
    const calendarRef = useRef("");

    async function handleDateSelect(selectinfo: DateSelectArg){
    
      alert(academyEvents?._id);
      let calendarApi = selectinfo.view.calendar;
      setCalInfo(calendarApi);
      setStartDate(selectinfo.start)
      setShowAddEventModal(true);
    }

    function handleDateSet(date: DatesSetArg) {
        
    }

    async function handleEventAdd(event: EventAddArg) {

        console.log("The set event title: " + eventTitle + "\n" + "The passed event title: " + event.event.title + "\n");
        console.log("The passed event start: " + event.event.start + "\n" + "The passed event end: " + event.event.end + "\n")
        console.log("The set event description: " + eventDescription + "\n");

        const eventObject = {
            eventName: event.event.title,
            eventDescription: eventDescription,
            endDate: event.event.endStr,
            startDate: event.event.startStr,
            academyReferenceId: "64cb1f4652e0fd8ebe5c7c16"
        } as EventsApi.CreateEventProps

        const newEvent = await EventsApi.createEvent(eventObject);
        if (newEvent) {
            alert("New event created in the db: " + newEvent._id);
        }
        console.info(newEvent);
    }

    return !academyEventsLoadingError ? (
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

            { academyEventsLoading &&
                <Spinner/>        
            }

            <div className='demo-app'>
                <div className=''>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    // eventContent={renderEventContent} // custom render function
                    // eventClick={this.handleEventClick}
                    // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    datesSet={date => handleDateSet}
                    eventAdd={event => handleEventAdd(event)}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                />
                </div>
            </div>
        </DefaultLayout>
    ) :
        <ErrorAlert errorTextHeading="Page error" errorText="There was an error loading the events for this academy"/>
    ;
  }
  