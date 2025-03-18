import { Link } from 'react-router';

import { Typography } from '../../components/common/Typography/Typography.tsx';
import { LoginForm } from '../../components/pages/login/LoginForm/LoginForm.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import * as styles from './Login.css.ts';

export const LoginPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.loginPage}>
                <Typography variant={'h1'} className={styles.loginHeading}>
                    ВОЙДИТЕ В СИСТЕМУ
                </Typography>
                <LoginForm />
                <div className={styles.tips}>
                    <div>
                        <span className={styles.grayText}>Нужен аккаунт?</span>
                        <Link to={ROUTES.REGISTER} className={styles.link}>
                            Зарегистрироваться!
                        </Link>
                    </div>
                    <Link to={ROUTES.RESET_PASSWORD} className={styles.link}>
                        Забыли пароль?
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};
