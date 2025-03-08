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

export const VacancyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: vacancy, isLoading } = useGetVacancyQuery(id || '');
    const [updateVacancy] = useUpdateVacancyMutation();
    const [deleteVacancy] = useDeleteVacancyMutation();
    const [isEditing, setIsEditing] = useState(false);

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
            navigate(ROUTES.MANAGER_VACANCIES);
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

                    <div className={styles.actions}>
                        <Button
                            type="secondary"
                            buttonText={isEditing ? <FcCancel /> : <FaRegEdit />}
                            onClick={() => setIsEditing(!isEditing)}
                        />
                        <Button type="critical" buttonText={<MdDelete />} onClick={handleDelete} />
                    </div>
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
