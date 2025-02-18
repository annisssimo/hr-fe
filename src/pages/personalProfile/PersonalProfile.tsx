import { useSelector } from 'react-redux';

import { Header } from '../../components/common/Header/Header';
import { Footer } from '../../components/common/Footer/Footer';
import { PersonalProfileForm } from '../../components/pages/personalProfile/PersonalProfileForm/PersonalProfileForm';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useGetOneQuery } from '../../services/users.api';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';

export const PersonalProfilePage = () => {
    const userId = useSelector(getUserSelector)?.id;

    const { data: userData, isLoading } = useGetOneQuery(userId ?? '');

    const user = userData?.data[0];

    return (
        <>
            <Header />
            <PersonalProfileForm user={user} />
            <Footer />
            {isLoading && <FullScreenLoader />}
        </>
    );
};
