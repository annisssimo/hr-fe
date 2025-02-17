import { useSearchParams } from 'react-router';

import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import { EnterNewPasswordForm } from '../../components/pages/enterNewPassword/EnterNewPasswordForm/EnterNewPasswordForm.tsx';

export const EnterNewPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    if (!token) {
        return (
            <Typography variant="text" type="danger">
                The link expired. Try again
            </Typography>
        );
    }

    return (
        <>
            <Header />
            <EnterNewPasswordForm token={token} />
            <Footer />
        </>
    );
};
