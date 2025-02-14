import React from 'react';
import { PasswordChangeForm } from '../../components/pages/passwordChange/PasswordChangeForm/PasswordChangeForm.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';

export const PasswordChange: React.FC = () => {
    return (
        <>
            <Header />
            <PasswordChangeForm />
            <Footer />
        </>
    );
};
