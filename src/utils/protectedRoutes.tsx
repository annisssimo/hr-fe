import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useSelector } from 'react-redux';
import React from 'react';
import { getUserSelector } from '../redux/userSlice/userSlice.ts';
import { USER_ROLE } from '../constants/index.ts';

interface ProtectedRoutesProps {
    allowedRoles?: USER_ROLE[];
    fallbackUrl?: string;
    guestOnly?: boolean;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
    allowedRoles,
    fallbackUrl,
    guestOnly,
}) => {
    const user = useSelector(getUserSelector);

    if (guestOnly) {
        if (user) {
            return <Navigate to={ROUTES.HOME} replace />;
        }
        return <Outlet />;
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
        return <Navigate to={fallbackUrl || ROUTES.HOME} replace />;
    }

    return <Outlet />;
};
