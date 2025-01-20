import * as styles from './ButtonComponentStyle.css.ts';
import React, { useState } from 'react';

export const Button: React.FC<{
    type: 'preferred' | 'secondary' | 'disabled' | 'critical';
    buttonText: string;
    onClick: (() => void) | (() => Promise<void>);
}> = ({ type, buttonText, onClick }) => {
    const buttonStyles = {
        preferred: { button: styles.preferredButton, text: styles.preferredText },
        secondary: { button: styles.secondaryButton, text: styles.secondaryText },
        disabled: { button: styles.disabledButton, text: styles.disabledText },
        critical: { button: styles.criticalButton, text: styles.criticalText },
    };

    const [isShaking, setIsShaking] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (type === 'disabled') {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300);
        } else {
            onClick();
        }
    };

    const { button, text } = buttonStyles[type];

    return (
        <button
            className={`${button} ${styles.baseButton} ${isShaking ? styles.disabledAnim : ''}`}
            onClick={handleClick}
        >
            <p className={`${text} ${styles.baseButtonText}`}>{buttonText}</p>
        </button>
    );
};
