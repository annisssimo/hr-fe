import { Link } from 'react-router';
import * as styles from './Header.css';
import { Logo } from '../Logo/Logo';
import defaultUserImgPath from '../../../assets/default-avatar.jpg';
import { ROUTES } from '../../../constants/routes';
import { Typography } from '../Typography/Typography';
import { USER_ROLE } from '../../../constants';

export const Header = ({ user }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <Logo width="120" height="60" />
                </Link>
            </div>
            {user && (
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
                    <div className={styles.userProfile}>
                        <Typography variant="text">{user.username}</Typography>
                        <img
                            src={defaultUserImgPath}
                            alt={user.username}
                            className={styles.userAvatar}
                        />
                    </div>
                </>
            )}
        </header>
    );
};

interface User {
    username: string;
    role: USER_ROLE;
}

interface HeaderProps {
    user?: User;
}
