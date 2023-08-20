import api from "@/network/axiosInstance";
import { CalendarEvent, TempEvent } from "@/models/event";
import moment from "moment";
import { EventInput } from "@fullcalendar/core";

export interface CreateEventProps {
    title?: string,
    description?: string,
    start?: string,
    end?: string,
    referenceId?: string,
}

export async function createEvent(createEventObject: CreateEventProps) {

    console.log("Event object = " + JSON.stringify(createEventObject));

    const response = await api.post<CalendarEvent>("/calendar/create-event", createEventObject);
    return response.data;
}


// export async function getAcademyCalendarEvents(academyId: string, start: string, end: string) {

//     console.log("ZZZ!")
//     const response = await api.get<EventInput[]>("/calendar/events/" + academyId + "?start=" + moment(start).toISOString() +"&end=" +
//     moment(end).toISOString());

//     console.log("Calendar events: " + response.data);

//     return response.data;
// }

export async function getAcademyEvents(academyId: string, start: string, end: string) {

    console.log("/calendar/events/" + academyId + "?start=" + moment(start).toISOString() +"&end=" +
    moment(end).toISOString())

    const response = await api.get<EventInput[]>("/calendar/events/" + academyId + "?start=" + moment(start).toISOString() +"&end=" +
    moment(end).toISOString());

    console.log(response.data);

    return response.data;
}