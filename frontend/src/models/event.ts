export interface CalendarEvent {
    _id?: string,
    title?: string,
    eventDescription?: string,
    start?: string,
    end?: string,
    academyReferenceId?: string,
}

export interface TempEvent {
    start?: string,
    end?: string,
    title?: string,
}