import api from "@/network/axiosInstance";
import { CalendarEvent } from "@/models/event";
import moment from "moment";
import { EventInput } from "@fullcalendar/core";

export interface CreateEventProps {
    title?: string,
    description?: string,
    location?: string,
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
    location?: string,
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

export interface RegisterToEventValues {
    eventId?: string,
    userId?: string,
}

export async function registerToEvent(eventvalues: RegisterToEventValues) {
    const response = await api.post("/calendar/register/"+ eventvalues.eventId + "/" + eventvalues.userId);
    console.log("Register API Response: " + JSON.stringify(response.data));
    return response.data;
}

export interface UnRegisterFromEventValues {
    eventId?: string,
    userId?: string,
}


export async function UnregisterFromEvent(eventvalues: UnRegisterFromEventValues) {
    const response = await api.post("/calendar/un-register/"+ eventvalues.eventId + "/" + eventvalues.userId);
    console.log("Un-register API Response: " + JSON.stringify(response.data));
    return response.data;
}

export async function notifyMembersOnEventUpdate(eventId: string) {
    const response = await api.post("/calendar/events/notify-members/" + eventId);
    console.log("Notify members Api response");
    return response.data;
}