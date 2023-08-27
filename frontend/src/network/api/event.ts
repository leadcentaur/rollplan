import api from "@/network/axiosInstance";
import { CalendarEvent, TempEvent } from "@/models/event";
import moment from "moment";
import { EventInput } from "@fullcalendar/core";

export interface CreateEventProps {
    title?: string,
    description?: string,
    type?: string,
    start?: string,
    end?: string,
    referenceId?: string,
}

export async function createEvent(createEventObject: CreateEventProps) {

    console.log("Event object = " + JSON.stringify(createEventObject));

    const response = await api.post<CalendarEvent>("/calendar/create-event", createEventObject);
    return response.data;
}

export async function deleteEvent(eventId: string) {
    const response = await api.post("/calendar/delete-event/" + eventId);
    return response.data;
}


export interface UpdateEventValues {
    title?: string,
    description?: string,
    type?: string,
    start?: string,
    end?: string,
    referenceId?: string,
}

export async function updateCalendarEvent(eventUpdateObject: UpdateEventValues, id: string) {
    const response = await api.patch("/calendar/update-event/" + id, eventUpdateObject);
    return response.data;
}

export async function getAcademyEvents(academyId: string, start: string, end: string) {

    console.log("/calendar/events/" + academyId + "?start=" + moment(start).toISOString() +"&end=" +
    moment(end).toISOString())

    const response = await api.get<EventInput[]>("/calendar/events/" + academyId + "?start=" + moment(start).toISOString() +"&end=" +
    moment(end).toISOString());

    console.log(response.data);

    return response.data;
}

