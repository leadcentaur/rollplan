import api from "@/network/axiosInstance";
import { CalendarEvent } from "@/models/event";

export interface CreateEventProps {
    eventName?: string,
    eventDescription?: string,
    startDate?: string,
    endDate?: string,
    academyReferenceId?: string,
}

export async function createEvent(createEventObject: CreateEventProps) {

    console.log("Event object = " + JSON.stringify(createEventObject));

    const response = await api.post<CalendarEvent>("/calendar/create-event", createEventObject);
    return response.data;
}

export async function getAcademyEventsById(academyId: string) {
    const response = await api.get<CalendarEvent[]>("/calendar/events/" + academyId);
    return response.data;
}