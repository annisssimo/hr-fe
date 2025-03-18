import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { PasswordResetForm } from '../../components/pages/passwordReset/PasswordResetForm.tsx';
import * as styles from './passwordReset.css.ts';

export const PasswordResetPage = () => {
    return (
        <>
            <Header />
            <div className={styles.resetPasswordPage}>
                <Typography variant={'h1'} className={styles.resetPasswordHeading}>
                    СБРОС ПАРОЛЯ
                </Typography>
                <PasswordResetForm />
            </div>
            <Footer />
        </>
    );
};
