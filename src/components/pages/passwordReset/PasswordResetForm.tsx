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
import { showErrorMessage } from '../../../utils/UI/toastMessages';
import * as styles from './PasswordResetForm.css';
import { usePasswordResetRequestMutation } from '../../../services/auth.api';

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
            if (error instanceof Error) {
                setIsPasswordReset(false);
                showErrorMessage(error.message);
            }
        }
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
                            <Button
                                type="preferred"
                                buttonText="BACK"
                                onClick={() => setIsPasswordReset(false)}
                            />
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
                                buttonText="RESET MY PASSWORD"
                                onClick={handleSubmit(onSubmit)}
                            />
                            <Button
                                type="secondary"
                                buttonText="BACK TO SIGN IN PAGE"
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
