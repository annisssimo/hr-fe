import { Vacancy } from '../../../types';
import { Column, Table } from '../../common/Table/Table';

interface VacanciesTableProps {
    vacancies: Vacancy[];
    isLoading: boolean;
}

export const VacanciesTable: React.FC<VacanciesTableProps> = ({ vacancies, isLoading }) => {
    const columns: Column<Vacancy>[] = [
        { title: 'Название', dataIndex: 'title' },
        { title: 'Описание', dataIndex: 'description' },
        { title: 'Навыки', dataIndex: 'skills' },
        { title: 'Локация', dataIndex: 'location' },
        { title: 'Доход', dataIndex: 'salary' },
    ];

    return <Table columns={columns} rows={vacancies} isLoading={isLoading} />;
};
