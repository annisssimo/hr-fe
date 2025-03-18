import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';

import { Button } from '../../common/ButtonComponent/ButtonComponent';
import { passwordResetSchema } from './passwordReset.schema';
import { ControlledInput } from '../../common/ControlledInput/ControlledInput';
import { ROUTES } from '../../../constants/routes';
import { Typography } from '../../common/Typography/Typography';
import { FullScreenLoader } from '../../common/FullScreenLoader/FullScreenLoader';
import * as styles from './PasswordResetForm.css';
import { usePasswordResetRequestMutation } from '../../../services/auth.api';
import { AxiosError } from 'axios';
import { handleAxiosError } from '../../../utils/handleAxiosError';
import { showErrorMessage } from '../../../utils/UI/toastMessages.ts';

export const PasswordResetForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
    } = useForm<z.infer<typeof passwordResetSchema>>({
        resolver: zodResolver(passwordResetSchema),
        mode: 'onChange',
    });

    const [passwordResetRequest, { isLoading }] = usePasswordResetRequestMutation();
    const navigate = useNavigate();

    const [isPasswordReset, setIsPasswordReset] = useState<boolean | null>(null);

    const onSubmit: SubmitHandler<z.infer<typeof passwordResetSchema>> = async (data) => {
        try {
            const response = await passwordResetRequest(data).unwrap();
            setIsPasswordReset(true);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 404) {
                    showErrorMessage('Account with this email not found');
                } else {
                    handleAxiosError(error);
                }
            }
        }
    };

    const handleBackClick = () => {
        navigate(ROUTES.LOGIN);
    };

    return (
        <>
            <form
                className={classNames(styles.formContainer, {
                    [styles.formContainerReducedPadding]: isPasswordReset,
                })}
                onSubmit={handleSubmit(onSubmit)}
            >
                {isPasswordReset ? (
                    <>
                        <Typography variant="h1">Check your email please</Typography>
                        <Typography variant="paragraph">
                            A password recovery link has been sent to the email address to which
                            your account is linked. Follow the link from the email
                        </Typography>
                        <div className={styles.button}>
                            <Button type="preferred" buttonText="НАЗАД" onClick={handleBackClick} />
                        </div>
                    </>
                ) : (
                    <>
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
                        <div className={styles.buttonRow}>
                            <Button
                                type={!isValid ? 'disabled' : 'preferred'}
                                buttonText="СБРОСИТЬ МОЙ ПАРОЛЬ"
                                onClick={handleSubmit(onSubmit)}
                            />
                            <Button
                                type="secondary"
                                buttonText="НАЗАД К РЕГИСТРАЦИИ"
                                onClick={() => navigate(ROUTES.LOGIN)}
                            />
                        </div>
                    </>
                )}
            </form>
            {isLoading && <FullScreenLoader />}
        </>
    );
};
