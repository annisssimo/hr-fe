import { configureStore } from '@reduxjs/toolkit';
import { userSessionReducer } from './userSlice/userSlice.ts';
import resumeReducer from './resumeSlice/resumeSlice.ts';
import { authApi } from '../services/auth.api.ts';
import { usersApi } from '../services/users.api.ts';
import { resumeApi } from '../services/resume.api.ts';
import { vacanciesApi } from '../services/vacancies.api.ts';

const store = configureStore({
    reducer: {
        userSession: userSessionReducer,
        resume: resumeReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [resumeApi.reducerPath]: resumeApi.reducer,
        [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            authApi.middleware,
            usersApi.middleware,
            resumeApi.middleware,
            vacanciesApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
