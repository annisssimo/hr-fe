import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const userReducer = userSlice.reducer;

export const getUserSelector = (state: { user: UserState }) => state.user.user;
