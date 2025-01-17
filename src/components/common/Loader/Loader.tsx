import React from 'react';
import * as styles from './LoaderStyle.css';

export const Loader: React.FC<{ customWidth?: number; customHeight?: number }> = ({
    customHeight = 60,
    customWidth = 60,
}) => {
    return (
        <div className={styles.loaderContainer}>
            <span
                className={styles.loaderIcon}
                style={
                    {
                        '--loader-height': `${customHeight}px`,
                        '--loader-width': `${customWidth}px`,
                    } as React.CSSProperties
                }
            ></span>
        </div>
    );
};
