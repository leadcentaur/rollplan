
import { LogEvent } from "@/models/log-event";
import api from "@/network/axiosInstance";


//http://localhost:5000/logevent?academyId=655e67180a77ae5bd08923c7&page=3
export async function getLogEvents(academyId: string, page: number = 1) {
    const response = await api.get("/logevent?academyId=" + academyId + "&page=" + page);
    return response.data;
}

export interface CreateLogEventProps {
    eventType?: string,
    eventTitle?: string,
    eventSubtitle?: string,
    eventMetadata?: string,
}

export async function createLogEvent(createLogEventObject: CreateLogEventProps) {

    console.log(createLogEventObject);
    const response = await api.post<LogEvent>("/logevent/create", createLogEvent);
    return response.data;
}