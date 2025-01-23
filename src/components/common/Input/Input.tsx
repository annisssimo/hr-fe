import { ReactNode } from 'react';
import * as styles from './Input.css';

export const Input = ({
    labelText,
    type = 'text',
    value,
    onChange,
    error,
    endAdornment,
}: InputProps) => {
    return (
        <div className={styles.container}>
            {!!value && (
                <label className={`${styles.label} ${error ? styles.errorLabel : ''}`}>
                    {labelText}
                </label>
            )}
            <div className={styles.inputContainer}>
                <input
                    type={type}
                    placeholder={labelText}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${styles.input} ${error ? styles.errorInput : ''}`}
                />
                {endAdornment && <div className={styles.toggleVisibility}>{endAdornment}</div>}
            </div>

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date';

interface InputProps {
    labelText?: string;
    type?: InputType;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    endAdornment?: ReactNode;
}
