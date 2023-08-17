import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React, { useRef, useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
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

interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default function Calendar({weekendsVisible, currentEvents}: CalendarState) {  
    
    const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState<Date>();
    const calendarRef = useRef("");

    async function handleDateSelect(selectinfo: DateSelectArg){
      setStartDate(selectinfo.start)
      setShowAddEventModal(true);
    }

    // async function handleEventAdd(select)

    return (
        <DefaultLayout>

        
            
            { showAddEventModal &&
                <AddEventModal isOpen={showAddEventModal}  selectedDate={startDate?.toISOString()!} onDismiss={() => {setShowAddEventModal(false)}}/>
            }


            <Breadcrumb pageName="Calendar" />
            <div className='demo-app'>
                <div className='demo-app-main'>
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
                    weekends={true}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    // eventContent={renderEventContent} // custom render function
                    // eventClick={this.handleEventClick}
                    // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                />
                </div>
            </div>
        </DefaultLayout>
    );
  }
  