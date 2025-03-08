import { createApi } from '@reduxjs/toolkit/query/react';
import { Vacancy } from '../types';
import { axiosBaseQuery } from './axios';
import { settings } from '../../config/settings';

export const vacanciesApi = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: axiosBaseQuery(settings.API_URL),
    tagTypes: ['Vacancies'],
    endpoints: (builder) => ({
        getVacancies: builder.query<Vacancy[], void>({
            query: () => ({ url: '/v1/vacancies', method: 'GET' }),
            providesTags: ['Vacancies'],
        }),
        getVacancy: builder.query<Vacancy, string>({
            query: (id) => ({ url: `/v1/vacancies/${id}`, method: 'GET' }),
            providesTags: ['Vacancies'],
        }),
        addVacancy: builder.mutation<Vacancy, Omit<Vacancy, 'id' | 'createdAt'>>({
            query: (vacancy) => ({
                url: '/v1/vacancies',
                method: 'POST',
                data: vacancy,
            }),
            invalidatesTags: ['Vacancies'],
        }),
        updateVacancy: builder.mutation<Vacancy, { id: string; data: Partial<Vacancy> }>({
            query: ({ id, data }) => ({
                url: `/v1/vacancies/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['Vacancies'],
        }),
        deleteVacancy: builder.mutation<void, string>({
            query: (id) => ({
                url: `/v1/vacancies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vacancies'],
        }),
    }),
});

export const {
    useGetVacanciesQuery,
    useGetVacancyQuery,
    useAddVacancyMutation,
    useUpdateVacancyMutation,
    useDeleteVacancyMutation,
} = vacanciesApi;
