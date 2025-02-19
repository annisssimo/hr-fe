import { USER_ROLE, USER_STATUS } from '../../constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticatedUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    managerId: string | null;
    avatar: string | null;
    role: USER_ROLE;
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
    reducers: {
        setUser(state, action: PayloadAction<AuthenticatedUser>) {
            state.user = action.payload
        },
        removeUser(state) {
            state.user = null;
        }
    },
});

export const { setUser, removeUser } = userSlice.actions

export const userReducer = userSlice.reducer;

export const getUserSelector = (state: { user: UserState }) => state.user.user;