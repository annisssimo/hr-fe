import React from 'react';
import * as styles from './SocialMediaIcon.css.ts';

export const SocialMediaIcon: React.FC<{
    svg: React.ReactNode;
    link: string;
    altText?: string;
}> = ({ svg, link, altText }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconContainer}
            aria-label={altText}
        >
            <div className={styles.svgWrapper}>{svg}</div>
        </a>
    );
};
