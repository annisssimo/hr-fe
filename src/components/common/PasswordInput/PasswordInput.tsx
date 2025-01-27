import { useState } from 'react';
import { Control, FieldError, FieldValues, Path } from 'react-hook-form';

import { ControlledInput } from '../ControlledInput/ControlledInput';
import { PasswordEyeAdornment } from '../PasswordEyeAdornment/PasswordEyeAdornment';

export const PasswordInput = <TFormValues extends Record<string, unknown>>({
    name,
    control,
    error,
    labelText = 'Password *',
    showPasswordToggle = true,
}: PasswordInputProps<TFormValues>) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible((prev) => !prev);
    };

    return (
        <ControlledInput
            name={name}
            control={control}
            labelText={labelText}
            type={visible ? 'text' : 'password'}
            error={error}
            endAdornment={
                showPasswordToggle && (
                    <PasswordEyeAdornment onClick={toggleVisibility} isPasswordVisible={visible} />
                )
            }
        />
    );
};

interface PasswordInputProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: Control<TFormValues>;
    error?: FieldError;
    labelText?: string;
    showPasswordToggle?: boolean;
}
