import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useSelector } from 'react-redux';
import React from 'react';
import { getUserSelector } from '../redux/userSlice/userSlice.ts';
import { USER_ROLE } from '../constants/index.ts';

interface ProtectedRoutesProps {
    allowedRoles?: USER_ROLE[];
    fallbackUrl?: string;
}

const Mock = {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    managerId: null,
    avatar: null,
    role: USER_ROLE.ADMIN,
};

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles, fallbackUrl }) => {
    const user = useSelector(getUserSelector);
    //const user = Mock;
    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={fallbackUrl || ROUTES.HOME} replace />;
    }
    return <Outlet />;
};
