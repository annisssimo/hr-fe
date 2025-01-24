import { useEffect, useRef, useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import * as styles from './Dropdown.css';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Typography } from '../Typography/Typography';

export const Dropdown = ({ label, options, selected, onChange }: DropdownProps) => {
    const [internalSelected, setInternalSelected] = useState(
        options.find((o) => o.value === selected)?.value,
    );
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setIsOpen(false));

    useEffect(() => {
        setInternalSelected(selected);
    }, [selected]);

    const handleSelect = (value: string) => {
        onChange(value);

        if (selected === undefined) {
            setInternalSelected(value);
        }

        setIsOpen(false);
    };

    const selectedLabel =
        options.find((o) => o.value === internalSelected)?.label ?? 'Select an option';

    return (
        <div ref={ref} className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.select} onClick={() => setIsOpen((prev) => !prev)} role="button">
                <Typography variant="text">{selectedLabel}</Typography>
                {!isOpen ? (
                    <GoTriangleDown className={styles.triangle} />
                ) : (
                    <GoTriangleUp className={styles.triangle} />
                )}
            </div>
            {isOpen && (
                <ul className={styles.dropdown}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.dropdownItem}
                            onClick={() => handleSelect(option.value)}
                        >
                            <Typography variant="text">{option.label}</Typography>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

interface DropdownProps {
    label?: string;
    options: { label: string; value: string }[];
    selected?: string;
    onChange: (value: string) => void;
}
