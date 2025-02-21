import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { USER_STATUS, USER_ROLE } from '../../constants';
import { RootState } from '../store';

type UserSessionState = {
    user: User;
};

const initialState: UserSessionState = {
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        managerId: undefined,
        avatar: undefined,
        status: USER_STATUS.PENDING,
        role: USER_ROLE.EMPLOYEE,
        statusAssignmentDate: undefined,
        position: undefined,
        startDay: null,
        endDate: null,
        dateOfBirth: null,
        phoneNumber: undefined,
        contactUsername: undefined,
    },
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
