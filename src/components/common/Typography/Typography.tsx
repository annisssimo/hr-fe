import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import * as styles from './Typography.css';

export const Typography = ({
    variant,
    children,
    className = '',
    href,
    target = '_self',
    copyable,
    type,
}: TypographyProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (copyable) {
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const classes = `${styles.text} ${type ? styles.textVariants[type] : ''} ${className}`.trim();

    if (variant.startsWith('h')) {
        const HeadingTag = variant as keyof JSX.IntrinsicElements;
        return <HeadingTag className={`${styles.title} ${className}`}>{children}</HeadingTag>;
    }

    if (variant === 'paragraph') {
        return (
            <div className={styles.paragraphWrapper}>
                <p className={`${styles.paragraph} ${className}`}>{children}</p>
                {copyable && (
                    <button className={styles.copyButton} onClick={handleCopy}>
                        {copied ? <IoMdCheckmark /> : <FaRegCopy />}
                    </button>
                )}
            </div>
        );
    }

    if (variant === 'link') {
        return (
            <a href={href} target={target} className={`${styles.link} ${className}`}>
                {children}
            </a>
        );
    }

    return <span className={classes}>{children}</span>;
};

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'text' | 'paragraph' | 'link';
    children: React.ReactNode;
    className?: string;
    href?: string;
    target?: '_blank' | '_self';
    copyable?: boolean;
    type?: 'secondary' | 'success' | 'warning' | 'danger';
}
