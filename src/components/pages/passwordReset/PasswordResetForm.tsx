import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import * as styles from './PasswordResetForm.css';
import { Button } from '../../common/ButtonComponent/ButtonComponent';
import { passwordResetSchema } from './passwordReset.schema';
import { ControlledInput } from '../../common/ControlledInput/ControlledInput';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../constants/routes';

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

    const onSubmit: SubmitHandler<z.infer<typeof passwordResetSchema>> = async (data) => {
        console.log(data);
    };

    const navigate = useNavigate();

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
        </form>
    );
};
