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
        addVacancy: builder.mutation<Vacancy, Omit<Vacancy, 'id' | 'createdAt'>>({
            query: (vacancy) => ({
                url: '/v1/vacancies',
                method: 'POST',
                data: vacancy,
            }),
            invalidatesTags: ['Vacancies'],
        }),
    }),
});

export const { useGetVacanciesQuery, useAddVacancyMutation } = vacanciesApi;
