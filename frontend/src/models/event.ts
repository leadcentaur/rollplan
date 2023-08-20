export interface CalendarEvent {
    _id?: string,
    title?: string,
    description?: string,
    start?: string,
    end?: string,
    referenceId?: string,
}

export interface TempEvent {
    start?: string,
    end?: string,
    title?: string,
}