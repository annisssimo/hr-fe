import './App.css.ts';
import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes';
import { LoginPage } from './pages/login/Login';
import { RegistrationPage } from './pages/registration/Registration';
import { PasswordResetPage } from './pages/passwordReset/passwordReset';
import { ConfirmationPage } from './pages/confirmationPage/ConfirmationPage';
import { ProtectedRoutes } from './utils/protectedRoutes';
import { UserRole } from './constants/roles.ts';
import { PasswordChange } from './pages/passwordChange/PasswordChange.tsx';
import { PersonalProfilePage } from './pages/personalProfile/PersonalProfile.tsx';

export const App = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<PasswordResetPage />} />
            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.MANAGER]}
                    />
                }
            >
                <Route path={ROUTES.CHANGE_PASSWORD} element={<PasswordChange />} />
                <Route path={ROUTES.PERSONAL_PROFILE} element={<PersonalProfilePage />} />
                <Route element={<ProtectedRoutes allowedRoles={[UserRole.ADMIN]} />}>
                    <Route path={ROUTES.REQUESTS} element={<ConfirmationPage />} />
                </Route>
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
};
