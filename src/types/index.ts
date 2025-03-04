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

export interface Vacancy {
    id: string;
    title: string;
    description: string;
    skills: string;
    location?: string;
    salary?: number;
    createdAt: string;
    updatedAt?: string;
    managerId: string;
}

export interface VacancyFormData {
    title: string;
    description: string;
    skills: string;
    location: string;
    salary?: number;
}
