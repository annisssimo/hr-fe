import { createApi } from '@reduxjs/toolkit/query/react';
import { settings } from './../../config/settings';
import { axiosBaseQuery } from './axios';
import { FormData as RegisterSchema } from '../components/pages/registration/RegistrationForm/registrationForm.schema';
import { FormData as LoginSchema } from '../components/pages/login/LoginForm/loginForm.schema';
import { AxiosResponse } from 'axios';
import { ChangePasswordFormData } from '../components/pages/passwordChange/passwordChangeForm/passwordChangeForm.schema';
import { PasswordResetParams } from '../components/pages/passwordReset/passwordReset.schema';
import { NewPasswordParams } from '../components/pages/enterNewPassword/EnterNewPasswordForm/newPasswordSchema';
import {
    ApiResponse,
    ChangePasswordApiResponse,
    PasswordResetApiRequestResponse,
    PasswordApiResetResponse,
} from './types';

type LoginResponse = {
    accessToken: string
}

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: axiosBaseQuery(settings.API_URL),
    endpoints: (builder) => ({
        register: builder.mutation<AxiosResponse, RegisterSchema>({
            query: (newUser) => ({ url: '/v1/auth/register', method: 'POST', data: newUser }),
        }),
        login: builder.mutation<LoginResponse, LoginSchema>({
            query: (userCredentials) => ({ url: '/v1/auth/login', method: 'POST', data: userCredentials })
        }),
        changePassword: builder.mutation<
            ApiResponse<ChangePasswordApiResponse>,
            ChangePasswordFormData & { userId: string }
        >({
            query: (data) => ({ url: '/v1/profile/change-password', method: 'PUT', data }),
        }),
        passwordResetRequest: builder.mutation<
            ApiResponse<PasswordResetApiRequestResponse>,
            PasswordResetParams
        >({
            query: (email) => ({
                url: '/v1/auth/password-reset/request',
                method: 'POST',
                data: email,
            }),
        }),
        passwordReset: builder.mutation<
            ApiResponse<PasswordApiResetResponse>,
            NewPasswordParams & { token: string }
        >({
            query: ({ newPassword, token }) => ({
                url: '/v1/auth/password-reset/reset',
                method: 'PUT',
                data: { newPassword, token },
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useChangePasswordMutation,
    usePasswordResetRequestMutation,
    usePasswordResetMutation,
} = authApi;
