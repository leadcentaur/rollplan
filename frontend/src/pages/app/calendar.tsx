import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import React, { useState } from "react";
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
import AddEventModal from "@/components/app/form/AddEventModal";

interface DemoAppState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default function Calendar({weekendsVisible, currentEvents}: DemoAppState) {  
    
    const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);

    return (
        <DefaultLayout>

            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => {setShowAddEventModal(true)}}
            >
              Add event
            </Link>
            
            { showAddEventModal &&
                <AddEventModal isOpen={showAddEventModal} onDismiss={() => {setShowAddEventModal(false)}}/>
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
                    // select={this.handleDateSelect}
                    // eventContent={renderEventContent} // custom render function
                    // eventClick={this.handleEventClick}
                    // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                />
                </div>
            </div>
        </DefaultLayout>
    );
  }
  