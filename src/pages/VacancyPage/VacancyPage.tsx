import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaRegEdit } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';

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
} from '../../services/applications.api';
import { showSuccessMessage } from '../../utils/UI/toastMessages';

export const VacancyPage: React.FC = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const user = useSelector(getUserSelector);

    const { data: vacancy, isLoading } = useGetVacancyQuery(id || '');
    const { data: applications } = useGetApplicationsByCandidateQuery(user?.id ?? '', {
        skip: !user?.id,
    });

    const [updateVacancy] = useUpdateVacancyMutation();
    const [deleteVacancy] = useDeleteVacancyMutation();
    const [applyToVacancy] = useCreateApplicationMutation();

    const [isEditing, setIsEditing] = useState(false);

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

    const handleApply = async () => {
        if (user && id) {
            try {
                await applyToVacancy({ candidateId: user.id, vacancyId: id }).unwrap();
                showSuccessMessage(SUCCESS_MESSAGES.APPLIED);
            } catch (error) {
                console.error('Error applying:', error);
            }
        }
    };

    if (isLoading) return <FullScreenLoader />;
    if (!vacancy) return <div>Вакансия не найдена</div>;

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.vacancy}>
                    <div className={styles.vacancyText}>
                        <Typography variant="h2">{vacancy.title}</Typography>
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
                            </div>
                        </>
                    )}

                    {user?.role === USER_ROLE.EMPLOYEE && (
                        <div className={styles.actions}>
                            <Button
                                type={hasApplied ? 'disabled' : 'preferred'}
                                buttonText={hasApplied ? 'Вы откликнулись' : 'Откликнуться'}
                                onClick={handleApply}
                            />
                        </div>
                    )}
                </div>

                {isEditing && (
                    <div className={styles.editForm}>
                        <Typography variant="h3">Редактировать вакансию</Typography>
                        <EditVacancyForm vacancy={vacancy} onSubmit={handleUpdate} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
