import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice/userSlice.ts';
import { authApi } from '../services/auth.api.ts';
const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
