import * as styles from './FullScreenLoaderStyle.css.ts';
import React from 'react';
import { Loader } from '../Loader/Loader.tsx';

export const FullScreenLoader: React.FC = () => {
    return (
        <div className={styles.fullScreenContainer}>
            <Loader />
        </div>
    );
};
