import { Footer } from '../../components/common/Footer/Footer';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { Header } from '../../components/common/Header/Header';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../constants';
import { ResumesList } from '../../components/pages/myResumes/ResumesList/ResumesList';
import { useGetResumesByCandidateQuery } from '../../services/resumes.api';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent';
import { useState } from 'react';
import { AddResumeModal } from '../../components/pages/myResumes/AddResumeModal/AddResumeModal';
import { Typography } from '../../components/common/Typography/Typography';
import { pageWrapper, contentWrapper } from '../VacanciesListPage/VacanciesListPage.css';

export const ResumesListPage = () => {
    const user = useSelector(getUserSelector);
    const { isLoading: isResumesLoading, refetch } = useGetResumesByCandidateQuery(user?.id || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        refetch();
    };

    return (
        <>
            <div className={pageWrapper}>
                <Header />
                <div className={contentWrapper}>
                    <div style={{ paddingLeft: '20px', width: '200px' }}>
                        <Typography variant="h1">Мои резюме</Typography>
                        <Button
                            type={'preferred'}
                            buttonText="Создать новое резюме"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                    {user?.role === USER_ROLE.EMPLOYEE ? (
                        <ResumesList candidateId={user.id} isLoading={isResumesLoading} />
                    ) : (
                        <p>Доступно только для кандидатов.</p>
                    )}
                </div>
                <Footer />
                {isResumesLoading && <FullScreenLoader />}
            </div>
            {isModalOpen && <AddResumeModal isModalOpen={isModalOpen} onClose={handleModalClose} />}
        </>
    );
};
