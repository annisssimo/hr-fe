import React from 'react';
import { RegistrationForm } from '../../components/pages/registration/RegistrationForm/RegistrationForm.tsx';
import * as styles from './Registration.css.ts';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';

export const RegistrationPage: React.FC = () => {
    return (
        <div className={styles.registrationPage}>
            <div className={styles.headerWrapper}>
                <Header />
            </div>
            <Typography variant={'h1'} className={styles.registrationHeader}>
                REGISTRATION
            </Typography>
            <RegistrationForm />
            <div className={styles.footerWrapper}>
                <Footer />
            </div>
        </div>
    );
};
