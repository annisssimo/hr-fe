import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { RootState } from '../store';

type UserSessionState = {
    user: User | null;
};

const initialState: UserSessionState = {
    user: null,
};

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        removeUser() {
            localStorage.removeItem('token');
            return { ...initialState };
        },
    },
});

export const { setUser, removeUser } = userSessionSlice.actions;
export const userSessionReducer = userSessionSlice.reducer;

export const getUserSelector = (state: RootState) => state.userSession.user;
