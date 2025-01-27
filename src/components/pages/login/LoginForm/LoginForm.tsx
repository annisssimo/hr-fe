import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { PasswordInput } from '../../../common/PasswordInput/PasswordInput';
import { loginSchema } from './loginForm.schema';
import * as styles from './LoginForm.css';

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

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
        console.log(data);
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
                    type={!isValid ? 'disabled' : 'preferred'}
                    buttonText="SUBMIT"
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </form>
    );
};
