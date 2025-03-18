import { useNavigate } from 'react-router';

import { Vacancy } from '../../../types';
import { Column, Table } from '../../common/Table/Table';
import { ROUTES } from '../../../constants/routes';

interface VacanciesTableProps {
    vacancies: Vacancy[];
    isLoading: boolean;
}

export const VacanciesTable: React.FC<VacanciesTableProps> = ({ vacancies, isLoading }) => {
    const navigate = useNavigate();

    const handleRowClick = (vacancy: Vacancy) => {
        navigate(ROUTES.VACANCY_DESC.replace(':id', String(vacancy.id)));
    };

    const columns: Column<Vacancy>[] = [
        { title: 'Название', dataIndex: 'title' },
        { title: 'Навыки', dataIndex: 'skills' },
        { title: 'Локация', dataIndex: 'location' },
        { title: 'Доход', dataIndex: 'salary' },
    ];

    return (
        <Table
            columns={columns}
            rows={vacancies?.map((app) => ({ ...app, skills: app.skills.join(', ') })) || []}
            isLoading={isLoading}
            onRowClick={handleRowClick}
        />
    );
};
