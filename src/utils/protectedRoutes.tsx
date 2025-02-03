import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useSelector } from 'react-redux';
import React from 'react';
import { getUserSelector } from '../redux/userSlice/userSlice.ts';
import { UserRole } from '../constants/roles.ts';

interface ProtectedRoutesProps {
    allowedRoles?: UserRole[];
    fallbackUrl?: string;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles, fallbackUrl }) => {
    const user = useSelector(getUserSelector);
    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={fallbackUrl || ROUTES.HOME} replace />;
    }
    return <Outlet />;
};
