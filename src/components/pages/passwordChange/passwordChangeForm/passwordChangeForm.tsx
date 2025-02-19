import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { ChangePasswordFormData, changePasswordSchema } from './passwordChangeForm.schema.ts';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput.tsx';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader.tsx';
import { Typography } from '../../../common/Typography/Typography.tsx';
import { useChangePasswordMutation } from '../../../../services/auth.api.ts';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/UI/toastMessages.ts';
import { ROUTES } from '../../../../constants/routes.ts';
import { getUserSelector } from '../../../../redux/userSlice/userSlice.ts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../../constants/index.ts';
import * as styles from './passwordChangeForm.css.ts';

export const PasswordChangeForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
        watch,
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        mode: 'onSubmit',
    });

    const user = useSelector(getUserSelector);
    const userId = user?.id;
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const formValues = watch();
    const isFormFilled = Object.values(formValues).every((value) => {
        return typeof value === 'string' ? value.trim() !== '' : true;
    });

    const hasErrorInRow = (
        field1: keyof ChangePasswordFormData,
        field2: keyof ChangePasswordFormData,
    ) => {
        return !!errors[field1] || !!errors[field2];
    };

    const handleInputChange = (field: keyof ChangePasswordFormData) => {
        clearErrors(field);
    };

    const onSubmit = async (data: ChangePasswordFormData) => {
        if (!userId) return;

        try {
            await changePassword({ ...data, userId }).unwrap();
            showSuccessMessage(SUCCESS_MESSAGES.PASSWORD_CHANGED);
            navigate(ROUTES.PERSONAL_PROFILE);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
                showErrorMessage(errorMessage);
            } else {
                showErrorMessage(ERROR_MESSAGES.SERVER_ERROR);
            }
        }
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
                        className={`${styles.inputWrapper} ${hasErrorInRow('oldPassword', 'newPassword') ? styles.noMarginTop : ''
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
                        className={`${styles.inputWrapper} ${hasErrorInRow('oldPassword', 'newPassword') ? styles.noMarginTop : ''
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
