import './App.css.ts';
import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes';
import { LoginPage } from './pages/login/Login';
import { RegistrationPage } from './pages/registration/Registration';
import { ConfirmationPage } from './pages/confirmationPage/ConfirmationPage';
import { ProtectedRoutes } from './utils/protectedRoutes';
import { PasswordChange } from './pages/passwordChange/PasswordChange.tsx';
import { PersonalProfilePage } from './pages/personalProfile/PersonalProfile.tsx';
import { UserDataList } from './pages/databaseOfUsers/UserDataList.tsx';
import { EnterNewPassword } from './pages/enterNewPassword/EnterNewPassword.tsx';
import { PasswordResetPage } from './pages/passwordReset/passwordReset.tsx';
import { USER_ROLE } from './constants/index.ts';

export const App = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<PasswordResetPage />} />
            <Route path={ROUTES.NEW_PASSWORD} element={<EnterNewPassword />} />
            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.MANAGER]}
                    />
                }
            >
                <Route path={ROUTES.DATABASE} element={<UserDataList />} />
                {/* <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />   */}
                <Route path={ROUTES.CHANGE_PASSWORD} element={<PasswordChange />} />
                <Route path={ROUTES.PERSONAL_PROFILE} element={<PersonalProfilePage />} />
                <Route element={<ProtectedRoutes allowedRoles={[USER_ROLE.ADMIN]} />}>
                    <Route path={ROUTES.REQUESTS} element={<ConfirmationPage />} />
                </Route>
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
};
