
export type userType = 'member' | 'owner';
export type beltType = 'white' | 'blue' | 'purple' | 'brown' | 'black'
export type eventLogType = 'userAdded' 
   | 'userRemoved' 
   | 'calendarEventUpdate'
   | 'calendarEventNew'
   | 'calendarEventDelete'
   | 'beltPromotion'

export type eventType = 
   | "BJJ Gi"
   | "BJJ No-Gi"
   | "BJJ Gi Fundamentals"
   | "BJJ No-Gi Fundamentals"
   | "BJJ Gi (Adult)"
   | "BJJ No-Gi (Adult)"
   | "BJJ Gi (Youth)"
   | "BJJ No-Gi (Youth)"
   | "BJJ Gi Advanced (Adult)"
   | "BJJ Gi Advanced (Youth)"
   | "BJJ No-Gi Advanced (Adult)"
   | "BJJ No-gi Advanced (Youth)"
   | "Open mat Gi"
   | "Open mat No-Gi"
   | "Open mat (Gi/No-Gi)"
   | "Seminar"
   | "Other"