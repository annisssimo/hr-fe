import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { settings } from '../../config/settings';
import {
    Application,
    CreateApplicationDto,
    ExtendedApplication,
    UpdateApplicationStatusDto,
} from './types';

export const applicationsApi = createApi({
    reducerPath: 'applicationsApi',
    baseQuery: axiosBaseQuery(settings.API_URL),
    tagTypes: ['Applications'],
    endpoints: (builder) => ({
        getApplications: builder.query<Application[], void>({
            query: () => ({ url: '/v1/applications', method: 'GET' }),
            providesTags: ['Applications'],
        }),
        getApplicationById: builder.query<Application, string>({
            query: (id) => ({ url: `/v1/applications/${id}`, method: 'GET' }),
            providesTags: ['Applications'],
        }),
        getApplicationsByCandidate: builder.query<ExtendedApplication[], string>({
            query: (candidateId) => ({
                url: `/v1/applications/candidate/${candidateId}`,
                method: 'GET',
            }),
            providesTags: ['Applications'],
        }),
        createApplication: builder.mutation<Application, CreateApplicationDto>({
            query: (application) => ({
                url: '/v1/applications',
                method: 'POST',
                data: application,
            }),
            invalidatesTags: ['Applications'],
        }),
        updateApplicationStatus: builder.mutation<
            Application,
            { id: string; data: UpdateApplicationStatusDto }
        >({
            query: ({ id, data }) => ({
                url: `/v1/applications/${id}/status`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['Applications'],
        }),
        deleteApplication: builder.mutation<void, string>({
            query: (id) => ({
                url: `/v1/applications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Applications'],
        }),
        getApplicationsByVacancy: builder.query<ExtendedApplication[], string>({
            query: (vacancyId) => ({
                url: `/v1/applications/vacancy/${vacancyId}`,
                method: 'GET',
            }),
            providesTags: ['Applications'],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useGetApplicationByIdQuery,
    useGetApplicationsByCandidateQuery,
    useCreateApplicationMutation,
    useUpdateApplicationStatusMutation,
    useDeleteApplicationMutation,
    useGetApplicationsByVacancyQuery,
} = applicationsApi;
