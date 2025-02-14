import { settings } from './../../config/settings';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { FormData } from '../components/pages/registration/RegistrationForm/registrationForm.schema';
import { AxiosResponse } from 'axios';
import { ChangePasswordFormData } from '../components/pages/passwordChange/PasswordChangeForm/passwordChangeForm.schema';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: axiosBaseQuery(settings.localApiBaseUrl),
    endpoints: (builder) => ({
        register: builder.mutation<AxiosResponse, FormData>({
            query: (newUser) => ({ url: '/v1/auth/register', method: 'POST', data: newUser }),
        }),
        changePassword: builder.mutation<
            AxiosResponse,
            ChangePasswordFormData & { userId: string }
        >({
            query: (data) => ({ url: '/v1/profile/change-password', method: 'PUT', data }),
        }),
    }),
});

export const { useRegisterMutation, useChangePasswordMutation } = authApi;
