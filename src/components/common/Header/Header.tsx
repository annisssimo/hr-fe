import { Link } from 'react-router';
import * as styles from './Header.css';
import { Logo } from '../Logo/Logo';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import { ROUTES } from '../../../constants/routes';
import { Typography } from '../Typography/Typography';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/userSlice/userSlice.ts';

export const Header = () => {
    const user = useSelector(getUserSelector);
    const userExists = user.id != '';
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <Logo width="120" height="60" />
                </Link>
            </div>
            {userExists && (
                <>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            {user.role === 'admin' && (
                                <li key="requests">
                                    <Link to={ROUTES.REQUESTS} className={styles.navItem}>
                                        Requests
                                    </Link>
                                </li>
                            )}
                            <li key="database">
                                <Link to={ROUTES.DATABASE} className={styles.navItem}>
                                    Base
                                </Link>
                            </li>
                            <li key="tasks">
                                <Link to={ROUTES.TASKS} className={styles.navItem}>
                                    Tasks
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Link to={ROUTES.PERSONAL_PROFILE} className={styles.noStyle}>
                        <div className={styles.userProfile}>
                            <Typography variant="text">
                                {user.firstName + ' ' + user.lastName}
                            </Typography>
                            <img
                                src={user?.avatar || defaultAvatar}
                                alt={user.firstName + ' ' + user.lastName}
                                className={styles.userAvatar}
                            />
                        </div>
                    </Link>
                </>
            )}
        </header>
    );
};
