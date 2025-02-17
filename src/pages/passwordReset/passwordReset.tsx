import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { PasswordResetForm } from '../../components/pages/passwordReset/PasswordResetForm.tsx';
import * as styles from './PasswordReset.css.ts';

export const PasswordResetPage = () => {
    return (
        <>
            <Header />
            <div className={styles.resetPasswordPage}>
                <Typography variant={'h1'} className={styles.resetPasswordHeading}>
                    PASSWORD RESET
                </Typography>
                <PasswordResetForm />
            </div>
            <Footer />
        </>
    );
};
