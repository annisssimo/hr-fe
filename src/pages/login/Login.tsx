import { Link } from 'react-router';

import { Typography } from '../../components/common/Typography/Typography.tsx';
import { LoginForm } from '../../components/pages/login/LoginForm/LoginForm.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import * as styles from './Login.css.ts';

export const LoginPage = () => {
    return (
        <>
            <Header />
            <div className={styles.loginPage}>
                <Typography variant={'h1'} className={styles.loginHeading}>
                    AUTHORIZATION
                </Typography>
                <LoginForm />
                <div className={styles.tips}>
                    <div>
                        <span className={styles.grayText}>Need an account?</span>
                        <Link to={ROUTES.REGISTER} className={styles.link}>
                            Sign Up!
                        </Link>
                    </div>
                    <Link to={ROUTES.RESET_PASSWORD} className={styles.link}>
                        Forgot Password?
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};
