import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice/userSlice.ts';
import { authApi } from '../services/auth.api.ts';
import { usersApi } from '../services/users.api.ts';

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
