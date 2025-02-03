import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from '../../constants/roles.ts';

interface AuthenticatedUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    managerId: string | null;
    avatar: string | null;
    role: UserRole;
}

interface UserState {
    user: AuthenticatedUser | null;
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
