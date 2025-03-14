import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseData } from './types';
import { axiosBaseQuery } from './axios';
import { settings } from '../../config/settings';

export const resumesApi = createApi({
    reducerPath: 'resumesApi',
    baseQuery: axiosBaseQuery(settings.API_URL),
    endpoints: (builder) => ({
        getResumesByCandidate: builder.query<ResponseData, string>({
            query: (candidateId) => ({
                url: '/v1/resumes/list',
                method: 'POST',
                body: { filters: { candidateId } },
            }),
        }),
        createResume: builder.mutation<ResponseData, FormData>({
            query: (resume) => ({
                url: '/v1/resumes',
                method: 'POST',
                data: resume,
            }),
        }),
        deleteResume: builder.mutation<void, string>({
            query: (id) => ({
                url: `/v1/resumes/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetResumesByCandidateQuery, useCreateResumeMutation, useDeleteResumeMutation } =
    resumesApi;
