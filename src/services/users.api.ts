import { settings } from './../../config/settings';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { GetUsersListResponse, UsersListParams } from './types';
import { User } from '../types';

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: axiosBaseQuery(settings.API_URL),
    endpoints: (builder) => ({
        getUsersList: builder.mutation<GetUsersListResponse, UsersListParams>({
            query: (params) => ({
                url: '/v1/users/list',
                method: 'POST',
                data: params,
            }),
        }),
        updateUser: builder.mutation<User, { userId: string; body: Partial<User> }>({
            query: ({ userId, body }) => ({
                url: `/v1/users/${userId}`,
                method: 'PUT',
                data: body,
            }),
        }),
        getOne: builder.query<
            { data: User[]; metadata: { limit: number; offset: number; count?: number } },
            string
        >({
            query: (userId) => ({
                url: '/v1/users/list',
                method: 'POST',
                data: {
                    filters: { id: [userId] },
                },
            }),
        }),
        updateUserProfile: builder.mutation<User, Partial<User>>({
            query: (updatedUser) => ({
                url: `/v1/users/${updatedUser.id}`,
                method: 'PUT',
                data: updatedUser,
            }),
        }),
    }),
});

export const {
    useGetUsersListMutation,
    useUpdateUserMutation,
    useGetOneQuery,
    useUpdateUserProfileMutation,
} = usersApi;
