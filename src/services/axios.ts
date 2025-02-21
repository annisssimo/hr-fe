import axios, { AxiosRequestConfig } from 'axios';
import { ROUTES } from '../constants/routes';

export const axiosBaseQuery =
    (baseUrl: string) =>
    async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
        try {
            const token = localStorage.getItem('token') || '';
            const result = await axios({
                url: baseUrl + url,
                method: method,
                data: data,
                params: params,
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return { data: result.data };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem('token');
                if (window.location.pathname !== ROUTES.LOGIN) {
                    setTimeout(() => {
                        window.location.href = ROUTES.LOGIN;
                    }, 3000);
                }
            }
            return { error };
        }
    };
