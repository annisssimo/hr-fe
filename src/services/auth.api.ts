import { createApi } from '@reduxjs/toolkit/query/react';
import { settings } from './../../config/settings';
import { axiosBaseQuery } from './axios';
import { FormData } from '../components/pages/registration/RegistrationForm/registrationForm.schema';
import { ChangePasswordFormData } from '../components/pages/passwordChange/passwordChangeForm/passwordChangeForm.schema';
import { PasswordResetParams } from '../components/pages/passwordReset/passwordReset.schema';
import { NewPasswordParams } from '../components/pages/enterNewPassword/EnterNewPasswordForm/newPasswordSchema';
import {
    ApiResponse,
    ChangePasswordApiResponse,
    PasswordResetApiRequestResponse,
    PasswordApiResetResponse,
} from './types';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: axiosBaseQuery(settings.API_URL),
    endpoints: (builder) => ({
        register: builder.mutation<ApiResponse, FormData>({
            query: (newUser) => ({ url: '/v1/auth/register', method: 'POST', data: newUser }),
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
    useChangePasswordMutation,
    usePasswordResetRequestMutation,
    usePasswordResetMutation,
} = authApi;
