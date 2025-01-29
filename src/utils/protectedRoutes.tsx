import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../constants/routes';

export const ProtectedRoutes = () => {
    const userAuth = false; //placeholder for redux
    return userAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
