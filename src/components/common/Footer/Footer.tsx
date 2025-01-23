import { SocialMediaIcon } from '../SocialMediaIcon/SocialMediaIcon.tsx';
import * as styles from './Footer.css.ts';
import { ReactComponent as LinkedInIcon } from '../../../assets/LinkedInIcon.svg';
import { ReactComponent as XIcon } from '../../../assets/X_logo_2023_original.svg';
import { ReactComponent as FaceBookIcon } from '../../../assets/Facebook_icon_2013.svg';
import { ContactUsButton } from '../ContactUsButton/ContactUsButton.tsx';
import { Slogan } from '../Slogan/Slogan.tsx';
import { Logo } from '../Logo/Logo.tsx';

export const Footer = () => {
    const contactsVisible = false;
    return (
        <footer className={styles.footer}>
            <div className={styles.logoAndDescription}>
                <div className={styles.columnWrapper}>
                    <Logo width={'140'} height={'60'} />
                    <p className={styles.copyrightText}>
                        Copyright © <span className={styles.underlinedText}>Sunmait</span> 2025
                    </p>
                </div>
                <Slogan />
            </div>
            <div className={styles.socialMediaRow}>
                <p className={contactsVisible ? styles.footerText : styles.contactsStyle}>
                    {/*It is required that depending on page or role Contact button and text are not displayed, this is a stub created to mimic such instances*/}
                    Contacts
                </p>
                <p className={styles.footerText}>Social media</p>
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
