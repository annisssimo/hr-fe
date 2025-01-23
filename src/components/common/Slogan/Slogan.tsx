import * as styles from './Slogan.css.ts';

export const Slogan = () => {
    return (
        <div className={styles.sloganWrapper}>
            <p className={styles.sloganText}>We love building awesome apps</p>
            <p className={styles.sloganText}>
                Creating beautiful, usable products engineered to perform
            </p>
        </div>
    );
};
