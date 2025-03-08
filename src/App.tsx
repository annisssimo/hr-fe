import { Navigate, Route, Routes } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from './constants/routes';
import { LoginPage } from './pages/login/Login';
import { RegistrationPage } from './pages/registration/Registration';
import { ConfirmationPage } from './pages/confirmationPage/ConfirmationPage';
import { ProtectedRoutes } from './utils/protectedRoutes';
import { PasswordChange } from './pages/passwordChange/PasswordChange.tsx';
import { PersonalProfilePage } from './pages/personalProfile/PersonalProfile.tsx';
import { UserDataList } from './pages/userDataList/UserDataList.tsx';
import { EnterNewPassword } from './pages/enterNewPassword/EnterNewPassword.tsx';
import { PasswordResetPage } from './pages/passwordReset/passwordReset.tsx';
import { USER_ROLE } from './constants/index.ts';
import { removeUser, setUser } from './redux/userSlice/userSlice.ts';
import { useGetUsersListMutation } from './services/users.api.ts';
import { FullScreenLoader } from './components/common/FullScreenLoader/FullScreenLoader.tsx';
import { MainPage } from './pages/mainPage/MainPage.tsx';
import './App.css.ts';
import { ResumeComparisonPage } from './pages/resumeComparisonPage/ResumeComparisonPage.tsx';
import { VacanciesManagerViewPage } from './pages/VacanciesManagerViewPage/VacanciesManagerViewPage.tsx';
import { VacancyPage } from './pages/VacancyPage/VacancyPage.tsx';

export const App = () => {
    const dispatch = useDispatch();
    const [getUser] = useGetUsersListMutation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                dispatch(removeUser());
                setIsLoading(false);
                return;
            }

            try {
                const userId = jwtDecode<{ id: string }>(token).id;

                if (!userId) {
                    throw new Error('Invalid token');
                }

                const response = await getUser({
                    filters: { id: [userId] },
                }).unwrap();

                const user = response.data[0];

                if (user) {
                    dispatch(setUser(user));
                } else {
                    throw new Error('User not found');
                }
            } catch {
                dispatch(removeUser());
            } finally {
                setIsLoading(false);
            }
        };

        initializeUser();
    }, [dispatch, getUser]);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Routes>
            <Route element={<ProtectedRoutes guestOnly={true} />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<PasswordResetPage />} />
                <Route path={ROUTES.NEW_PASSWORD} element={<EnterNewPassword />} />
            </Route>
            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.MANAGER]}
                    />
                }
            >
                <Route path={ROUTES.DATABASE} element={<UserDataList />} />
                <Route path={ROUTES.HOME} element={<MainPage />} />

                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
                <Route path={ROUTES.CHANGE_PASSWORD} element={<PasswordChange />} />
                <Route path={ROUTES.PERSONAL_PROFILE} element={<PersonalProfilePage />} />
                <Route element={<ProtectedRoutes allowedRoles={[USER_ROLE.ADMIN]} />}>
                    <Route path={ROUTES.REQUESTS} element={<ConfirmationPage />} />
                </Route>
                <Route element={<ProtectedRoutes allowedRoles={[USER_ROLE.MANAGER]} />}>
                    <Route path={ROUTES.MANAGER_VACANCIES} element={<VacanciesManagerViewPage />} />
                    <Route path={ROUTES.VACANCY_DESC} element={<VacancyPage />} />
                    <Route path={ROUTES.COMPARE_RESUMES} element={<ResumeComparisonPage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
};
