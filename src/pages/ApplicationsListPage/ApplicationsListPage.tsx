import { Footer } from '../../components/common/Footer/Footer';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { Header } from '../../components/common/Header/Header';
import { useGetApplicationsByCandidateQuery } from '../../services/applications.api';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../constants';
import { ApplicationsTable } from '../../components/pages/ApplicationsTable/ApplicationsTable';

export const ApplicationsListPage = () => {
    const user = useSelector(getUserSelector);
    const { isLoading: isApplicationsLoading } = useGetApplicationsByCandidateQuery(user?.id || '');

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Мои заявки</h1>
                {user?.role === USER_ROLE.EMPLOYEE ? (
                    <ApplicationsTable candidateId={user.id} isLoading={isApplicationsLoading} />
                ) : (
                    <p>Доступно только для кандидатов.</p>
                )}
            </div>
            <Footer />
            {isApplicationsLoading && <FullScreenLoader />}
        </div>
    );
};
