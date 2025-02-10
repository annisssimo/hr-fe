import { settings } from './../../config/settings';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { FormData } from '../components/pages/registration/RegistrationForm/registrationForm.schema';
import { AxiosResponse } from 'axios';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: axiosBaseQuery(settings.localApiBaseUrl),
    endpoints: (builder) => ({
        register: builder.mutation<AxiosResponse, FormData>({
            query: (newUser) => ({ url: '/v1/auth/register', method: 'POST', data: newUser }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;
