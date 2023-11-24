
import api from "@/network/axiosInstance";


export async function getLogEvents(academyId: string) {
    const response = await api.get("/logevent/" + academyId);
    return response.data;
}

export interface CreateLogEventProps {
    eventType?: string,
    eventTitle?: string,
    eventSubtitle?: string,
    eventMetadata?: string,
}

export async function createLogEvent() {
    
}