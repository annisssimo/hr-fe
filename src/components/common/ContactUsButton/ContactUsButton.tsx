import * as styles from './ContactUsButton.css.ts';

export const ContactUsButton: React.FC<{ contactsVisible?: boolean }> = ({
    contactsVisible = false,
}) => {
    return (
        <button className={contactsVisible ? styles.contactsButton : styles.contactsStyle}>
            СВЯЗАТЬСЯ
        </button>
    );
};
