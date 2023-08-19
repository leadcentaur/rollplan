import api from "@/network/axiosInstance";
import { Event } from "@/models/event";

export interface CreateEventProps {
    eventName?: string,
    eventDescription?: string,
    startDate?: string,
    endDate?: string,
    academyReferenceId?: string,
}

export async function createEvent(createEventObject: CreateEventProps) {
    const response = await api.post<Event>("/calendar/create-event", createEventObject);
    return response.data;
}