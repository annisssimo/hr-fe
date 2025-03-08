import { useState } from 'react';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent';
import { Footer } from '../../components/common/Footer/Footer';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { Header } from '../../components/common/Header/Header';
import { AddVacancyModal } from '../../components/pages/vacancies/AddVacancyModal/AddVacancyModal';
import { VacanciesTable } from '../../components/pages/vacancies/VacanciesTable';
import { useGetVacanciesQuery, useAddVacancyMutation } from '../../services/vacancies.api';
import { VacancyFormData } from '../../types';
import { getUserSelector } from '../../redux/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../constants';

export const VacanciesListPage = () => {
    const { data: vacancies, isLoading } = useGetVacanciesQuery();
    const [addVacancy] = useAddVacancyMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector(getUserSelector);

    const handleAddVacancy = async (data: VacancyFormData) => {
        if (!user) return;

        const vacancyData = {
            ...data,
            salary: data.salary ? Number(data.salary) : undefined,
            managerId: user.id,
        };
        await addVacancy(vacancyData).unwrap();
    };

    return (
        <div>
            <Header />
            <div
                style={{
                    padding: '20px',
                }}
            >
                <div style={{ width: '160px' }}>
                    {user && (user.role === USER_ROLE.MANAGER || user.role === USER_ROLE.ADMIN) && (
                        <Button
                            type="preferred"
                            buttonText="Создать вакансию"
                            onClick={() => setIsModalOpen(true)}
                        />
                    )}
                </div>
                <VacanciesTable vacancies={vacancies || []} isLoading={isLoading} />
                <AddVacancyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddVacancy}
                />
            </div>
            <Footer />
            {isLoading && <FullScreenLoader />}
        </div>
    );
};
