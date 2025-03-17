import { Footer } from '../../components/common/Footer/Footer';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { Header } from '../../components/common/Header/Header';
import { useGetApplicationsByCandidateQuery } from '../../services/applications.api';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { ApplicationsTable } from '../../components/pages/ApplicationsTable/ApplicationsTable';
import { pageWrapper, contentWrapper } from '../VacanciesListPage/VacanciesListPage.css';

export const ApplicationsListPage = () => {
    const user = useSelector(getUserSelector);
    const { data: applications, isLoading: isApplicationsLoading } =
        useGetApplicationsByCandidateQuery(user?.id || '');

    return (
        <div className={pageWrapper}>
            <Header />
            <div className={contentWrapper}>
                <h1>Мои отклики</h1>
                {!applications ||
                    (applications.length === 0 ? (
                        <p>Вы еще не откликались на вакансии</p>
                    ) : (
                        <ApplicationsTable
                            candidateId={user.id}
                            isLoading={isApplicationsLoading}
                        />
                    ))}

                {isApplicationsLoading && <FullScreenLoader />}
            </div>
            <Footer />
        </div>
    );
};
