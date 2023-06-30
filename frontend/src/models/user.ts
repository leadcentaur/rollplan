
export interface User {
    _id: string,
    username: string,
    email?: string,
    displayName?: string,
    about?: string,
    profilePicUrl?: string,
    belt: string,
    firstname?: string,
    lastname?: string,
    createdAt?: string,
    dateOfLastPromotion?: string,
    dateOfLastAttendance?: string,
    classAttended?: number,
    numberOfStripes?: number
}