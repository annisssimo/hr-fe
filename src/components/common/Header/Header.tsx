import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaArchive } from 'react-icons/fa';

import * as styles from './Header.css';
import { Logo } from '../Logo/Logo';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import { ROUTES } from '../../../constants/routes';
import { Typography } from '../Typography/Typography';
import { getUserSelector, removeUser } from '../../../redux/userSlice/userSlice.ts';
import { useClickOutside } from '../../../hooks/useClickOutside.tsx';
import { USER_ROLE } from '../../../constants/index.ts';

export const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUserSelector);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside(menuRef, () => setMenuOpen(false));

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setMenuOpen(false);
        dispatch(removeUser());
    };

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
                            {user?.role === 'admin' && (
                                <>
                                    <li key="requests">
                                        <Link to={ROUTES.REQUESTS} className={styles.navItem}>
                                            Запросы
                                        </Link>
                                    </li>

                                    <li key="database">
                                        <Link to={ROUTES.DATABASE} className={styles.navItem}>
                                            База
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li key="compare">
                                <Link to={ROUTES.COMPARE_RESUMES} className={styles.navItem}>
                                    Сравнить
                                </Link>
                            </li>
                            <li key="vacancies-list">
                                <Link to={ROUTES.VACANCIES_LIST} className={styles.navItem}>
                                    Вакансии
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.userProfile} onClick={toggleMenu} ref={menuRef}>
                        <Typography variant="text">
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <img
                            src={user?.avatar || defaultAvatar}
                            alt={user.firstName + ' ' + user.lastName}
                            className={styles.userAvatar}
                        />
                        {menuOpen && (
                            <div className={styles.dropdownMenu}>
                                <Link to={ROUTES.PERSONAL_PROFILE} className={styles.menuItem}>
                                    <FaUser /> Профиль
                                </Link>
                                {user?.role == USER_ROLE.EMPLOYEE && (
                                    <Link to={ROUTES.APPLICATIONS} className={styles.menuItem}>
                                        <FaArchive />
                                        Мои заявки
                                    </Link>
                                )}
                                <button onClick={handleLogout} className={styles.menuItem}>
                                    <FaSignOutAlt /> Выйти
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};
