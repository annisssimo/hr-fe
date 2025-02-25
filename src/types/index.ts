import { USER_STATUS, USER_ROLE } from '../constants';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    managerId?: string;
    avatar?: string | null;
    status: USER_STATUS | null;
    role: USER_ROLE | null;
    statusAssignmentDate?: Date;
    position?: string;
    startDay?: Date | null;
    endDate?: Date | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string;
    contactUsername?: string;
    manager?: User;
}
