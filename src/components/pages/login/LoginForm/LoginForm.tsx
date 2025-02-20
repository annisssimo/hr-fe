import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../../../../services/auth.api';
import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput';
import { FormData, loginSchema } from './loginForm.schema';
import * as styles from './LoginForm.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../../constants/routes';
import { useGetUsersListMutation } from '../../../../services/users.api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/userSlice/userSlice';
import { mapUserToAuthenticatedUser } from '../../../../utils/mappers';
import { jwtDecode } from 'jwt-decode';
import { showErrorMessage } from '../../../../utils/UI/toastMessages';
import { AxiosError } from 'axios';
import { handleAxiosError } from '../../../../utils/handleAxiosError.ts';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader.tsx';

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
    const [getUser] = useGetUsersListMutation();
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data: FormData) => {
        try {
            const response = await login(data).unwrap();
            console.log('Response: ', response);

            const userId = jwtDecode<{ id: string }>(response.accessToken).id;

            const user = await getUser({
                limit: 1,
                offset: 0,
                filters: { id: [userId] },
            }).unwrap();

            dispatch(setUser(mapUserToAuthenticatedUser(user.data[0])));
            localStorage.setItem('token', response.accessToken);

            navigate(ROUTES.PERSONAL_PROFILE);
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
                        'This email is under consideration at the present time. Please, wait for email with confirmation status.',
                    );
                    break;
                default:
                    handleAxiosError(error);
                    break;
            }
        }
    };

    return (
        <>
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
                        type={!isValid ? 'disabled' : 'preferred'}
                        buttonText="SUBMIT"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </form>
            {isLoading && <FullScreenLoader />}
        </>
    );
};
