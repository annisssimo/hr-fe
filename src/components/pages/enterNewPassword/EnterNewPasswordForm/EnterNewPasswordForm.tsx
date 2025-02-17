import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput';
import { Typography } from '../../../common/Typography/Typography';
import { newPasswordSchema } from './newPasswordSchema.ts';
import { NewPasswordParams } from './newPasswordSchema.ts';
import * as styles from './EnterNewPasswordForm.css.ts';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/UI/toastMessages.ts';
import { ROUTES } from '../../../../constants/routes.ts';
import { usePasswordResetMutation } from '../../../../services/auth.api.ts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../../constants/index.ts';

export const EnterNewPasswordForm = ({ token }: EnterNewPasswordFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        watch,
    } = useForm<NewPasswordParams>({
        resolver: zodResolver(newPasswordSchema),
        mode: 'onSubmit',
    });

    const [passwordReset, { isLoading }] = usePasswordResetMutation();
    const navigate = useNavigate();
    const formValues = watch();
    const isFormFilled = formValues.newPassword?.trim() !== '';

    const handleInputChange = (field: keyof NewPasswordParams) => {
        clearErrors(field);
    };

    const onSubmit = async (data: NewPasswordParams) => {
        try {
            const response = await passwordReset({
                newPassword: data.newPassword,
                token,
            }).unwrap();
            showSuccessMessage(SUCCESS_MESSAGES.PASSWORD_CHANGED);
            navigate(ROUTES.LOGIN);
            return response;
        } catch (error) {
            const errorMessage = (error as CustomError).data || ERROR_MESSAGES.SERVER_ERROR;
            showErrorMessage(errorMessage);
        }
    };

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <div className={styles.formWrapper}>
            <Typography variant={'h1'}>ENTER NEW PASSWORD</Typography>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <PasswordInput
                        name="newPassword"
                        control={control}
                        labelText="New Password"
                        error={errors.newPassword}
                        onChange={() => handleInputChange('newPassword')}
                    />
                </div>
                <div className={styles.buttonRow}>
                    <Button type="secondary" onClick={onBackClick} buttonText="BACK" />
                    <Button
                        type={!isFormFilled ? 'disabled' : 'preferred'}
                        buttonText="SUBMIT"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
                {isLoading && <FullScreenLoader />}
            </form>
        </div>
    );
};

interface EnterNewPasswordFormProps {
    token: string;
}

interface CustomError {
    status: number;
    data: string;
}
