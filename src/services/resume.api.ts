import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resumeApi = createApi({
    reducerPath: 'resumeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        compareResumes: builder.mutation<
            { matchPercentage: number },
            { resumeText: string; jobText: string }
        >({
            query: (data) => ({
                url: 'resume/compare',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCompareResumesMutation } = resumeApi;
