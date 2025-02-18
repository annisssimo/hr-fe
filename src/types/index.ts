import { USER_STATUS, USER_ROLE } from '../constants';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    managerId?: string;
    avatar?: string;
    status: USER_STATUS;
    role: USER_ROLE;
    statusAssignmentDate?: Date;
    position?: string;
    startDay?: Date | null;
    endDate?: Date | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string;
    contactUsername?: string;
}

export interface CustomError {
    status: number;
    data: string;
}
