import { Link } from 'react-router';
import { SocialMediaIcon } from '../SocialMediaIcon/SocialMediaIcon.tsx';
import * as styles from './Footer.css.ts';
import { ReactComponent as LinkedInIcon } from '../../../assets/LinkedInIcon.svg';
import { ReactComponent as XIcon } from '../../../assets/X_logo_2023_original.svg';
import { ReactComponent as FaceBookIcon } from '../../../assets/Facebook_icon_2013.svg';
import { ContactUsButton } from '../ContactUsButton/ContactUsButton.tsx';
import { Slogan } from '../Slogan/Slogan.tsx';
import { Logo } from '../Logo/Logo.tsx';
import { ROUTES } from '../../../constants/routes.ts';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/userSlice/userSlice.ts';
import { USER_ROLE } from '../../../constants';
import { Typography } from '../Typography/Typography.tsx';

export const Footer = () => {
    const user = useSelector(getUserSelector);
    const contactsVisible = Boolean(
        user?.role === USER_ROLE.MANAGER || user?.role === USER_ROLE.EMPLOYEE,
    );
    return (
        <footer className={styles.footer}>
            <div className={styles.logoAndDescription}>
                <div className={styles.columnWrapper}>
                    <Link to={ROUTES.HOME}>
                        <Logo width="140" height="60" color="white" />
                    </Link>
                    <Typography variant="paragraph" className={styles.copyrightText}>
                        Copyright © <span className={styles.underlinedText}>Sunmait</span> 2025
                    </Typography>
                </div>
                <Slogan />
            </div>
            <div className={styles.socialMediaRow}>
                <Link to={ROUTES.HOME}>
                    <Typography
                        variant="paragraph"
                        className={contactsVisible ? styles.footerText : styles.contactsStyle}
                    >
                        Контакты
                    </Typography>
                </Link>
                <Typography variant="paragraph" className={styles.footerText}>
                    Соц. сети
                </Typography>
                <SocialMediaIcon
                    svg={<LinkedInIcon />}
                    link={'https://www.linkedin.com/company/sunmait/'}
                />
                <SocialMediaIcon svg={<XIcon />} link={'https://x.com/sunmaittech'} />
                <SocialMediaIcon
                    svg={<FaceBookIcon />}
                    link={'https://www.facebook.com/sunmait.tech'}
                />
                <ContactUsButton contactsVisible={contactsVisible} />
            </div>
        </footer>
    );
};
