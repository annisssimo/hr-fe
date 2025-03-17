import { useEffect, useRef, useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import classNames from 'classnames';

import * as styles from './Dropdown.css';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Typography } from '../Typography/Typography';

export const Dropdown = ({
    label,
    options,
    selected,
    onChange,
    variant = DropdownVariant.Small,
}: DropdownProps) => {
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

    const selectedLabel = options.find((o) => o.value === internalSelected)?.label ?? 'Выберите';

    const isLarge = variant === DropdownVariant.Large;
    const isSmall = variant === DropdownVariant.Small;

    return (
        <div
            ref={ref}
            className={classNames({
                [styles.containerWithLeftLabelInside]: isLarge,
                [styles.container]: isSmall,
            })}
        >
            {label && (
                <label
                    className={classNames({
                        [styles.label]: isSmall,
                        [styles.leftLabel]: isLarge,
                    })}
                >
                    {label}
                </label>
            )}
            <div
                className={classNames(styles.select, {
                    [styles.selectForLarge]: isLarge,
                    [styles.selectForSmall]: isSmall,
                })}
                onClick={() => setIsOpen((prev) => !prev)}
                role="button"
            >
                <Typography variant="text">{selectedLabel}</Typography>
                {isOpen ? (
                    <GoTriangleUp className={styles.triangle} />
                ) : (
                    <GoTriangleDown className={styles.triangle} />
                )}
            </div>
            {isOpen && (
                <ul
                    className={classNames(styles.dropdown, {
                        [styles.dropdownForLarge]: isLarge,
                        [styles.dropdownForSmall]: isSmall,
                    })}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={classNames(styles.dropdownItem, {
                                [styles.dropdownItemForLarge]: isLarge,
                                [styles.dropdownItemForSmall]: isSmall,
                            })}
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

enum DropdownVariant {
    Small = 'small',
    Large = 'large',
}

interface DropdownProps {
    label?: string;
    options: { label: string; value: string }[];
    selected?: string;
    onChange: (value: string) => void;
    variant?: 'small' | 'large';
}
