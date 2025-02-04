import React, { useState } from 'react';
import * as styles from './passwordChangeForm.css.ts';
import { useForm } from 'react-hook-form';
import { FormData, changePasswordSchema } from './passwordChangeForm.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput.tsx';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';
import { useNavigate } from 'react-router';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader.tsx';
import { Typography } from '../../../common/Typography/Typography.tsx';

export const PasswordChangeForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(changePasswordSchema),
        mode: 'onSubmit',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formValues = watch();
    const isFormFilled = Object.values(formValues).every((value) => value.trim() !== '');

    const hasErrorInRow = (field1: keyof FormData, field2: keyof FormData) => {
        return !!errors[field1] || !!errors[field2];
    };

    const handleInputChange = (field: keyof FormData) => {
        clearErrors(field);
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        // Work imitation
        console.log(data);
    };

    const handleFormSubmit = async () => {
        const result = await trigger();
        if (result) {
            await handleSubmit(onSubmit)();
        }
    };

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <div className={styles.formWrapper}>
            <Typography variant={'h1'}>Change password</Typography>
            <form className={styles.formContainer}>
                <div className={styles.twoPerRow}>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('oldPassword', 'newPassword') ? styles.noMarginTop : ''
                        }`}
                    >
                        <PasswordInput
                            name="oldPassword"
                            control={control}
                            labelText="Old password"
                            error={errors.oldPassword}
                            onChange={() => handleInputChange('oldPassword')}
                        />
                    </div>
                    <div
                        className={`${styles.inputWrapper} ${
                            hasErrorInRow('oldPassword', 'newPassword') ? styles.noMarginTop : ''
                        }`}
                    >
                        <PasswordInput
                            name="newPassword"
                            control={control}
                            labelText="New Password"
                            error={errors.newPassword}
                            onChange={() => handleInputChange('newPassword')}
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
                {isLoading && <FullScreenLoader />}
            </form>
        </div>
    );
};
