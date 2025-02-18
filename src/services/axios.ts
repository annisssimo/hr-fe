import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorResponse } from './types';

export const axiosBaseQuery =
    (baseUrl: string) =>
    async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
        try {
            const token = localStorage.getItem('accessToken') || '';
            const result = await axios({
                url: baseUrl + url,
                method: method,
                data: data,
                params: params,
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return { data: result.data };
        } catch (error) {
            const err = error as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: (err.response?.data as ErrorResponse).message || err.message,
                },
            };
        }
    };
