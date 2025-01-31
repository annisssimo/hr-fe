import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { Typography } from '../Typography/Typography';
import * as styles from '../Input/Input.css';

export const PhoneInputWithMask = <T extends FieldValues>({
    name,
    control,
    defaultValue = '',
    disabled = false,
    labelText,
    error,
}: PhoneInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as PathValue<T, Path<T>>}
            render={({ field: { value, onChange } }) => (
                <div className={styles.containerWithLeftLabelInside}>
                    <label className={`${styles.leftLabel} ${error ? styles.errorLabel : ''}`}>
                        {labelText}
                    </label>
                    <div className={styles.inputContainerForOutlined}>
                        <InputMask
                            mask="+375 (99) 999-99-99"
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            className={`${styles.input} ${styles.outlinedInput} ${
                                error ? styles.errorInputForOutline : ''
                            } ${disabled ? styles.disabledInput : ''}`}
                            alwaysShowMask
                        />
                        {error && (
                            <Typography variant="text" className={styles.errorMessageForPhone}>
                                {error.message}
                            </Typography>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

interface PhoneInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: string;
    labelText?: string;
    error?: FieldError;
    disabled?: boolean;
}
