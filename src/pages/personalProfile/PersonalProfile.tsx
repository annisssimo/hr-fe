import { Header } from '../../components/common/Header/Header';
import { Footer } from '../../components/common/Footer/Footer';
import {
    User,
    PersonalProfileForm,
} from '../../components/pages/personalProfile/PersonalProfileForm/PersonalProfileForm';

export const PersonalProfilePage = () => {
    const user: User = {
        role: 'admin',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        position: 'frontendDev',
        startDay: '2021-01-01',
        endDate: '',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+375336816477',
        skypeTelegram: 'johndoe',
    };

    return (
        <>
            <Header />
            <PersonalProfileForm user={user} />
            <Footer />
        </>
    );
};
