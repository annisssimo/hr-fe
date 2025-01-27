import * as styles from './DefaultAdornment.css.ts';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import React from 'react';

export const DefaultAdornment: React.FC<{
    onClick: (() => void) | (() => Promise<void>);
    isPasswordVisible: boolean;
}> = ({ onClick, isPasswordVisible }) => {
    const handleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
    };
    return (
        <button type="button" onClick={handleVisibility} className={styles.toggleVisibility}>
            {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
    );
};
