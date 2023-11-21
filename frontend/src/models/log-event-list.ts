
// eventType: yup.string().required(),
// eventTimeStamp: yup.string().required(),
// eventTitle: yup.string().required(),
// eventSubtitle: yup.string().required(),
// eventMetadata: yup.string().required(),

export interface LogEvent {
    eventType?: string,
    eventTimeStamp?: string,
    eventTitle?: string,    
    eventSubtitle?: string,
    eventMetadata?: string,
}