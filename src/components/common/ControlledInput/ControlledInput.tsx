import { Controller, FieldValues, FieldError, Path, PathValue, Control } from 'react-hook-form';
import { Input } from '../Input/Input.tsx';

export const ControlledInput = <T extends FieldValues>({
    name,
    control,
    defaultValue = '',
    labelText,
    type = 'text',
    error,
    endAdornment,
    onChange,
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
    onChange?: () => void;
}
