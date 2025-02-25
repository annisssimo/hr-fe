import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { registrationSchema, FormData } from './registrationForm.schema.ts';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';
import * as styles from './RegistrationForm.css.ts';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader.tsx';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput.tsx';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput.tsx';
import { showSuccessMessage } from '../../../../utils/UI/toastMessages.ts';
import { useRegisterMutation } from '../../../../services/auth.api.ts';
import { ROUTES } from '../../../../constants/routes.ts';
import { ApiResponse } from '../../../../services/types.ts';
import { handleAxiosError } from '../../../../utils/handleAxiosError.ts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../../constants/index.ts';

export const RegistrationForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        clearErrors,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'onSubmit',
    });
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const formValues = watch();
    const [isFormFilled, setIsFormFilled] = useState(false);
    useEffect(() => {
        setIsFormFilled(Object.values(formValues).every((value) => value.trim() !== ''));
    }, [formValues]);

    const onBackClick = () => {
        navigate(-1);
    };

    const onSubmit = async (data: FormData) => {
        try {
            const rawResult = await register(data).unwrap();
            const response: ApiResponse = { success: true, ...rawResult };
            showSuccessMessage(SUCCESS_MESSAGES.REGISTERED);
            navigate(ROUTES.MAIN_PAGE);
            return response;
        } catch (error) {
            const err = error as AxiosError;
            switch (err.status) {
                case 409:
                    setError('email', { type: 'manual', message: ERROR_MESSAGES.EMAIL_TAKEN });
                    break;
                default:
                    handleAxiosError(error);
                    break;
            }
        }
    };

    const handleFormSubmit = async () => {
        const result = await trigger();
        if (result) {
            await handleSubmit(onSubmit)();
        }
    };

    const handleInputChange = (field: keyof FormData) => {
        clearErrors(field);
    };

    const hasErrorInRow = (field1: keyof FormData, field2: keyof FormData) => {
        return !!errors[field1] || !!errors[field2];
    };

    return (
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.twoPerRow}>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('firstName', 'lastName') ? styles.noMarginTop : ''
                        }`}
                    >
                        <ControlledInput
                            name="firstName"
                            control={control}
                            labelText="First Name"
                            error={errors.firstName}
                            onChange={() => handleInputChange('firstName')}
                        />
                    </div>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('firstName', 'lastName') ? styles.noMarginTop : ''
                        }`}
                    >
                        <ControlledInput
                            name="lastName"
                            control={control}
                            labelText="Last Name"
                            error={errors.lastName}
                            onChange={() => handleInputChange('lastName')}
                        />
                    </div>
                </div>
                <div className={styles.formGrid}>
                    <div className={styles.inputWrapper}>
                        <ControlledInput
                            name="email"
                            control={control}
                            labelText="Email"
                            type="email"
                            error={errors.email}
                            onChange={() => handleInputChange('email')}
                        />
                    </div>
                </div>
                <div className={styles.twoPerRow}>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('password', 'confirmPassword') ? styles.noMarginTop : ''
                        }`}
                    >
                        <PasswordInput
                            name="password"
                            control={control}
                            labelText="Password"
                            error={errors.password}
                            onChange={() => handleInputChange('password')}
                        />
                    </div>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('password', 'confirmPassword') ? styles.noMarginTop : ''
                        }`}
                    >
                        <PasswordInput
                            name="confirmPassword"
                            control={control}
                            labelText="Confirm Password"
                            error={errors.confirmPassword}
                            onChange={() => handleInputChange('confirmPassword')}
                        />
                    </div>
                </div>

                <div className={styles.buttonRow}>
                    <Button type="secondary" onClick={onBackClick} buttonText="BACK" />
                    <Button
                        type={!isFormFilled ? 'disabled' : 'preferred'}
                        buttonText="SUBMIT"
                        onClick={handleFormSubmit}
                    />
                </div>
            </form>
            {isLoading && <FullScreenLoader />}
        </>
    );
};
