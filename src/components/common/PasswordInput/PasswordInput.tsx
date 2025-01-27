import { useState } from 'react';
import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';

import { ControlledInput } from '../ControlledInput/ControlledInput';
import * as styles from './PasswordInput.css';

export const PasswordInput = <TFormValues extends Record<string, unknown>>({
    name,
    control,
    error,
    labelText = 'Password *',
    showPasswordToggle = true,
    onChange,
}: PasswordInputProps<TFormValues>) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVisible((prev) => !prev);
    };

    return (
        <ControlledInput
            name={name}
            control={control}
            labelText={labelText}
            type={visible ? 'text' : 'password'}
            error={error}
            onChange={onChange}
            endAdornment={
                showPasswordToggle && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className={styles.toggleVisibility}
                    >
                        {visible ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
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
    onChange?: () => void;
}
