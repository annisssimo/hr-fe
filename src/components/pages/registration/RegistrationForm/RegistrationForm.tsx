import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { registrationSchema, FormData } from './registrationForm.schema.ts';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';
import * as styles from './RegistrationForm.css.ts';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader.tsx';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput.tsx';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput.tsx';

export const RegistrationForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'onSubmit',
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formValues = watch();
    const isFormFilled = Object.values(formValues).every((value) => value.trim() !== '');

    const onBackClick = () => {
        navigate(-1);
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        // Work imitation until we connect axios and do proper try-catch-finally or something along those lines
        console.log(data);
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
