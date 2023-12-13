export default interface LogEvent {
    _id?: string,
    eventType?: string,
    eventTimeStamp?: string,
    eventTitle?: string,    
    eventSubtitle?: string,
    createdAt?: string,
    updatedAt?: string,
    eventMetadata?: string,
}

export interface LogEventPage {
    logEvents: [
        event: LogEvent
    ],
    totalPages: number,
    pageSize: number,
}