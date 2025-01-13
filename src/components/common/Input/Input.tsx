import { ChangeEvent, useState } from 'react';
import * as styles from './Input.css';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';

const Input = ({ labelText, id, type, value, onChange, error }: InputProps) => {
    const [isFilledWithContent, setIsFilledWithContent] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.value);

        if (e.target.value === '') {
            setIsFilledWithContent(false);
        } else {
            setIsFilledWithContent(true);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={styles.container}>
            {isFilledWithContent && (
                <label htmlFor={id} className={`${styles.label} ${error ? styles.errorLabel : ''}`}>
                    {labelText}
                </label>
            )}
            <div className={styles.inputContainer}>
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    placeholder={labelText}
                    value={value}
                    onChange={(e) => handleInputChange(e)}
                    className={`${styles.input} ${error ? styles.errorInput : ''}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleVisibility}
                    >
                        {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                )}
            </div>

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date';

interface InputProps {
    labelText: string;
    id: string;
    type: InputType;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}
