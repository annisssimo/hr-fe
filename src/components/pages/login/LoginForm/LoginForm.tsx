import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { useLoginMutation } from '../../../../services/auth.api';
import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput';
import { FormData, loginSchema } from './loginForm.schema';
import * as styles from './LoginForm.css';
import { ROUTES } from '../../../../constants/routes';
import { showErrorMessage } from '../../../../utils/UI/toastMessages';
import { handleAxiosError } from '../../../../utils/handleAxiosError.ts';
import { useGetUsersListMutation } from '../../../../services/users.api.ts';
import { setUser } from '../../../../redux/userSlice/userSlice.ts';
import { USER_ROLE } from '../../../../constants/index.ts';

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [getUser, { isLoading: isGettingUser }] = useGetUsersListMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const isLoading = isLoggingIn || isGettingUser;

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data: FormData) => {
        try {
            const response = await login(data).unwrap();
            const accessToken = response.accessToken;

            localStorage.setItem('token', accessToken);

            const userId = jwtDecode<{ id: string }>(accessToken).id;

            const user = await getUser({
                limit: 1,
                offset: 0,
                filters: { id: [userId] },
            }).unwrap();

            dispatch(setUser(user.data[0]));

            if (user.data[0].role === USER_ROLE.ADMIN) {
                navigate(ROUTES.REQUESTS);
            } else {
                navigate(ROUTES.MAIN_PAGE);
            }
        } catch (error) {
            const err = error as AxiosError;

            switch (err.status) {
                case 401:
                    showErrorMessage(
                        'Incorrect email or password. Please check your credentials and try again.',
                    );
                    break;
                case 403:
                    showErrorMessage(
                        'This email is under consideration at the present time. Please, wait for an email with confirmation status.',
                    );
                    break;
                default:
                    handleAxiosError(error);
                    break;
            }
        }
    };

    return (
        <form className={styles.formContainer}>
            <div className={styles.inputWrapper}>
                <ControlledInput
                    name="email"
                    control={control}
                    labelText="Email *"
                    type="email"
                    onChange={() => clearErrors('email')}
                    error={errors.email}
                />
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" control={control} error={errors.password} />
            </div>
            <div className={styles.buttonRow}>
                <Button
                    type={!isValid || isLoading ? 'disabled' : 'preferred'}
                    buttonText={isLoading ? 'ЗАГРУЗКА...' : 'ВОЙТИ'}
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </form>
    );
};
