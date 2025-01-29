import './App.css.ts';
import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes.ts';
import { LoginPage } from './pages/login/Login.tsx';
import { RegistrationPage } from './pages/registration/Registration.tsx';
import { PasswordResetPage } from './pages/passwordReset/passwordReset.tsx';
import { ConfirmationPage } from './pages/confirmationPage/ConfirmationPage.tsx';
import { ProtectedRoutes } from './utils/protectedRoutes.tsx';

export const App = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<PasswordResetPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path={ROUTES.REQUESTS} element={<ConfirmationPage />} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
};
