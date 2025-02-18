import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { PasswordChangeForm } from '../../components/pages/passwordChange/PasswordChangeForm/PasswordChangeForm.tsx';

export const PasswordChange = () => {
    return (
        <>
            <Header />
            <PasswordChangeForm />
            <Footer />
        </>
    );
};
