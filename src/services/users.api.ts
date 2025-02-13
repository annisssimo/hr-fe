import { settings } from './../../config/settings';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export interface UsersListParams {
    limit?: number;
    offset?: number;
    includeCount?: boolean;
    filters?: {
        id?: string[];
        status?: Array<'active' | 'archived' | 'pending'>;
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

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    actions: null;
    statusAssignmentDate: Date;
}

type GetUsersListResponse = UsersListResponse<User>;

export type UpdateInputParams = {
    firstName?: string;
    lastName?: string;
    email?: string;
    managerId?: string;
    password?: string;
    avatar?: string;
    status?: 'active' | 'pending' | 'archived';
    role?: 'admin' | 'employee' | 'manager';
    statusAssignmentDate?: Date;
};

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: axiosBaseQuery(settings.localApiBaseUrl),
    endpoints: (builder) => ({
        getUsersList: builder.mutation<GetUsersListResponse, UsersListParams>({
            query: (params) => ({
                url: '/v1/users/list',
                method: 'POST',
                data: params,
            }),
        }),
        updateUser: builder.mutation<User, { userId: string; body: UpdateInputParams }>({
            query: ({ userId, body }) => ({
                url: `/v1/users/${userId}`,
                method: 'PUT',
                data: body,
            }),
        }),
    }),
});

export const { useGetUsersListMutation, useUpdateUserMutation } = usersApi;
