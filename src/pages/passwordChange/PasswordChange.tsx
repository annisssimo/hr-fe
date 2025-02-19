import { PasswordChangeForm } from '../../components/pages/passwordChange/passwordChangeForm/passwordChangeForm.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';

export const PasswordChange = () => {
    return (
        <>
            <Header />
            <PasswordChangeForm />
            <Footer />
        </>
    );
};
