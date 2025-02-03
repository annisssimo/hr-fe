import { Controller, FieldValues, FieldError, Path, PathValue, Control } from 'react-hook-form';
import { Input } from '../Input/Input.tsx';
import { InputVariant } from '../../../constants/inputVariant.ts';
import React from 'react';

export const ControlledInput = <T extends FieldValues>({
    name,
    control,
    defaultValue = '',
    labelText,
    type = 'text',
    error,
    endAdornment,
    onChange,
    variant = InputVariant.LabelTop,
    disabled = false,
}: ControlledInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as PathValue<T, Path<T>>}
            render={({ field }) => (
                <Input
                    type={type}
                    labelText={labelText}
                    onChange={(value) => {
                        field.onChange(value);
                        onChange?.();
                    }}
                    value={field.value}
                    error={error?.message}
                    endAdornment={endAdornment}
                    variant={variant}
                    disabled={disabled}
                />
            )}
        />
    );
};

interface ControlledInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: string;
    labelText?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date';
    error?: FieldError;
    endAdornment?: React.ReactNode;
    variant?: InputVariant;
    disabled?: boolean;
    onChange?: () => void;
}
