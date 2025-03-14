import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaRegEdit } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';
import { Table } from '../../components/common/Table/Table';
import {
    useGetVacancyQuery,
    useUpdateVacancyMutation,
    useDeleteVacancyMutation,
} from '../../services/vacancies.api';
import { VacancyFormData } from '../../types';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent';
import { Typography } from '../../components/common/Typography/Typography';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { ROUTES } from '../../constants/routes';
import { Header } from '../../components/common/Header/Header';
import { Footer } from '../../components/common/Footer/Footer';
import * as styles from './VacancyPage.css';
import { EditVacancyForm } from '../../components/pages/vacancies/EditVacancyForm/EditVacancyForm';
import { SUCCESS_MESSAGES, USER_ROLE } from '../../constants';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useSelector } from 'react-redux';
import {
    useCreateApplicationMutation,
    useGetApplicationsByCandidateQuery,
    useGetApplicationsByVacancyQuery,
} from '../../services/applications.api';
import { showSuccessMessage } from '../../utils/UI/toastMessages';
import { ApplyModal } from '../../components/pages/vacancies/ApplyModal/ApplyModal';
import { useGetResumesByCandidateQuery } from '../../services/resumes.api';
import { pageWrapper, contentWrapper } from '../VacanciesListPage/VacanciesListPage.css';

export const VacancyPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const user = useSelector(getUserSelector);

    const { data: vacancy, isLoading } = useGetVacancyQuery(id || '');
    const { data: applications } = useGetApplicationsByCandidateQuery(user?.id ?? '', {
        skip: !user?.id,
    });
    const { data } = useGetResumesByCandidateQuery(user?.id ?? '', {
        skip: !user?.id,
    });

    const { data: allApplications, isLoading: isApplicationsLoading } =
        useGetApplicationsByVacancyQuery(id || '', {
            skip: !id,
        });

    const candidateResumes = data?.data || [];

    const [updateVacancy] = useUpdateVacancyMutation();
    const [deleteVacancy] = useDeleteVacancyMutation();
    const [applyToVacancy] = useCreateApplicationMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isApplicationsTableVisible, setIsApplicationsTableVisible] = useState(false); // состояние для таблицы

    const hasApplied = applications?.some((app) => app.vacancyId === id);

    const handleUpdate = async (data: VacancyFormData) => {
        if (id) {
            await updateVacancy({
                id,
                data,
            }).unwrap();
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        //TODO: action confirmation modal
        if (id) {
            await deleteVacancy(id).unwrap();
            navigate(ROUTES.VACANCIES_LIST);
        }
    };

    const handleApply = async (resumeId: string, coverLetter?: string, source?: string) => {
        if (user && id) {
            try {
                await applyToVacancy({
                    candidateId: user.id,
                    vacancyId: id,
                    resumeId,
                    coverLetter,
                    source,
                }).unwrap();
                showSuccessMessage(SUCCESS_MESSAGES.APPLIED);
            } catch (error) {
                console.error('Error applying:', error);
            }
        }
    };

    const handleShowApplications = () => {
        setIsApplicationsTableVisible(!isApplicationsTableVisible);
    };

    if (isLoading) return <FullScreenLoader />;
    if (!vacancy) return <div>Вакансия не найдена</div>;

    return (
        <div className={pageWrapper}>
            <Header />
            <div className={contentWrapper}>
                <div className={styles.vacancy}>
                    <div className={styles.vacancyText}>
                        <Typography variant="h2">{vacancy.title}</Typography>
                        <Typography variant="text">{`На эту вакансию откликнулось ${allApplications?.length || 0} человек`}</Typography>
                        <Typography variant="text">{vacancy.description}</Typography>
                        <Typography variant="text">
                            <strong>Навыки:</strong> {vacancy.skills}
                        </Typography>
                        <Typography variant="text">
                            <strong>Локация:</strong> {vacancy.location}
                        </Typography>
                        <Typography variant="text">
                            <strong>Доход:</strong> {vacancy.salary}
                        </Typography>
                    </div>

                    {(user?.role === USER_ROLE.ADMIN || user?.role == USER_ROLE.MANAGER) && (
                        <>
                            <div className={styles.actions}>
                                <Button
                                    type="secondary"
                                    buttonText={isEditing ? <FcCancel /> : <FaRegEdit />}
                                    onClick={() => setIsEditing(!isEditing)}
                                />
                                <Button
                                    type="critical"
                                    buttonText={<MdDelete />}
                                    onClick={handleDelete}
                                />
                                <Button
                                    type="preferred"
                                    buttonText={
                                        isApplicationsTableVisible
                                            ? 'Скрыть отклики'
                                            : 'Показать отклики'
                                    }
                                    onClick={handleShowApplications}
                                />
                            </div>
                        </>
                    )}

                    {user?.role === USER_ROLE.EMPLOYEE && (
                        <>
                            <div className={styles.actions}>
                                <Button
                                    type={hasApplied ? 'disabled' : 'preferred'}
                                    buttonText={hasApplied ? 'Вы откликнулись' : 'Откликнуться'}
                                    onClick={() => setIsApplyModalOpen(true)}
                                />
                            </div>
                            <ApplyModal
                                isOpen={isApplyModalOpen}
                                onClose={() => setIsApplyModalOpen(false)}
                                onApply={handleApply}
                                resumes={candidateResumes || []}
                            />
                        </>
                    )}
                </div>

                {isEditing && (
                    <div className={styles.editForm}>
                        <Typography variant="h3">Редактировать вакансию</Typography>
                        <EditVacancyForm vacancy={vacancy} onSubmit={handleUpdate} />
                    </div>
                )}

                {isApplicationsTableVisible && allApplications && (
                    <div style={{ marginTop: '40px' }}>
                        <Table
                            columns={[
                                { title: 'Кандидат', dataIndex: 'candidateName' },
                                { title: 'Резюме', dataIndex: 'resumeTitle' },
                                { title: 'Сопроводительное письмо', dataIndex: 'coverLetter' },
                                { title: 'Статус', dataIndex: 'status' },
                                { title: 'Дата отклика', dataIndex: 'createdAt' },
                                { title: 'Источник', dataIndex: 'source' },
                            ]}
                            rows={allApplications}
                            isLoading={isApplicationsLoading}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
