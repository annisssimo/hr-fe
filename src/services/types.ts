import { USER_STATUS } from '../constants';
import { User } from '../types';

export interface ApiResponse<T = void> {
    success: boolean;
    data?: T;
    message?: string;
}

interface ValidationError {
    message: string;
    errors: {
        message: string;
        field: string;
    }[];
}

export interface ErrorResponse {
    message: string;
    error?: string;
    statusCode: number;
}

interface SuccessResponse {
    message: string;
}

export type ChangePasswordApiResponse = ValidationError | ErrorResponse | SuccessResponse;

export type PasswordResetApiRequestResponse = ValidationError | ErrorResponse | null;

export type PasswordApiResetResponse = ValidationError | ErrorResponse | null;

export interface UsersListParams {
    limit?: number;
    offset?: number;
    includeCount?: boolean;
    include?: string;
    filters?: {
        id?: string[];
        status?: Array<USER_STATUS>;
        managerId?: string[];
    };
    filtersOr?: {
        isAdmin?: boolean;
        isManager?: boolean;
        isEmployee?: boolean;
    };
    search?: string;
    sort?: Array<{
        field: 'firstName' | 'lastName' | 'email';
        order: 'asc' | 'desc';
    }>;
}

interface UsersListResponse<T> {
    data: T[];
    metadata: {
        count: number;
        limit: number;
        offset: number;
    };
}

export type GetUsersListResponse = UsersListResponse<User>;

export interface Application {
    id: string;
    candidateId: string;
    vacancyId: string;
    status: string;
    createdAt: string;
}

interface ApplicationDetails {
    vacancyTitle: string;
    skills: string;
    location: string;
    salary: number;
}

export type ExtendedApplication = Application & ApplicationDetails;

export interface CreateApplicationDto {
    candidateId: string;
    vacancyId: string;
    resumeId: string;
    coverLetter?: string;
    source?: string;
}

export interface UpdateApplicationStatusDto {
    status: string;
}

export interface Resume {
    id: string;
    candidateId: string;
    title: string;
    filePath: string | null;
    skills: string;
    experience: string;
    education: string;
    createdAt: string;
    updatedAt: string;
}

interface Metadata {
    limit: number;
    offset: number;
}

export interface ResponseData {
    data: Resume[];
    metadata: Metadata;
}
