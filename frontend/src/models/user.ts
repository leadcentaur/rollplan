
export interface User {
    _id: string,
    academyReferenceId?: string,
    username?: string,
    email?: string,
    about?: string,
    displayName?: string,
    profilePicUrl?: string,
    belt?: string,
    numberOfStripes?: number
    userType?: string,
    firstname?: string,
    lastname?: string,
    createdAt?: string,
    dateOfLastPromotion?: string,
    dateOfLastAttendance?: string,
    classAttended?: number,
}

export interface MemberPage {
    members: User[],
    totalPages: number,
    page: number,
}