import { ReactNode } from 'react';
import classNames from 'classnames';

import { Typography } from '../Typography/Typography';
import * as styles from './Input.css';

export const Input = ({
    labelText,
    type = 'text',
    value,
    onChange,
    error,
    endAdornment,
    variant = InputVariant.LabelTop,
    disabled = false,
}: InputProps) => {
    const isOutlined = variant === InputVariant.LabelLeftOutlined;

    return (
        <div
            className={classNames({
                [styles.containerWithLeftLabelInside]: isOutlined,
                [styles.container]: !isOutlined,
            })}
        >
            {isOutlined ? (
                <label className={classNames(styles.leftLabel, { [styles.errorLabel]: error })}>
                    {labelText}
                </label>
            ) : (
                !!value && (
                    <label className={classNames(styles.label, { [styles.errorLabel]: error })}>
                        {labelText}
                    </label>
                )
            )}
            <div
                className={classNames({
                    [styles.inputContainerForOutlined]: isOutlined,
                    [styles.inputContainer]: !isOutlined,
                })}
            >
                <input
                    type={type}
                    placeholder={isOutlined ? undefined : labelText}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    className={classNames(styles.input, {
                        [styles.outlinedInput]: isOutlined,
                        [styles.errorInput]: error,
                        [styles.disabledInput]: disabled,
                    })}
                />
                {endAdornment && <div className={styles.toggleVisibility}>{endAdornment}</div>}
            </div>

            {error && (
                <Typography variant="text" className={styles.errorMessage}>
                    {error}
                </Typography>
            )}
        </div>
    );
};

enum InputVariant {
    LabelTop = 'labelTop',
    LabelLeftOutlined = 'labelLeftOutlined',
}

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date';

interface InputProps {
    labelText?: string;
    type?: InputType;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    endAdornment?: ReactNode;
    variant?: InputVariant;
    disabled?: boolean;
}
