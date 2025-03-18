import { useNavigate } from 'react-router';
import { Column, Table } from '../../common/Table/Table';
import { ROUTES } from '../../../constants/routes';
import { useGetApplicationsByCandidateQuery } from '../../../services/applications.api';
import { ExtendedApplication } from '../../../services/types';

interface ApplicationsTableProps {
    candidateId: string;
    isLoading: boolean;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ candidateId, isLoading }) => {
    const navigate = useNavigate();
    const { data: applications, isFetching } = useGetApplicationsByCandidateQuery(candidateId);

    const handleRowClick = (application: ExtendedApplication) => {
        navigate(ROUTES.VACANCY_DESC.replace(':id', String(application.vacancyId)));
    };

    const columns: Column<ExtendedApplication>[] = [
        { title: 'Название вакансии', dataIndex: 'vacancyTitle' },
        { title: 'Навыки', dataIndex: 'skills' },
        { title: 'Локация', dataIndex: 'location' },
        { title: 'Доход', dataIndex: 'salary' },
        { title: 'Статус', dataIndex: 'status' },
    ];

    return (
        <Table
            columns={columns}
            rows={applications?.map((app) => ({ ...app, skills: app.skills.join(', ') }))}
            isLoading={isLoading || isFetching}
            onRowClick={handleRowClick}
        />
    );
};
