import { FC } from 'react';
import { useGetResumesByCandidateQuery } from '../../../../services/resumes.api';
import * as styles from './ResumesList.css';
import { FullScreenLoader } from '../../../common/FullScreenLoader/FullScreenLoader';
import { ResumeCard } from '../ResumeCard/ResumeCard';

export const ResumesList: FC<ResumesListProps> = ({ candidateId, isLoading }) => {
    const { data } = useGetResumesByCandidateQuery(candidateId, {
        skip: isLoading,
    });

    const resumes = data?.data;

    if (!resumes?.length) {
        return <p className={styles.emptyText}>У вас пока нет загруженных резюме.</p>;
    }

    return (
        <>
            <div className={styles.listContainer}>
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
            </div>
            {isLoading && <FullScreenLoader />}
        </>
    );
};

interface ResumesListProps {
    candidateId: string;
    isLoading: boolean;
}
