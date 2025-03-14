import { FC } from 'react';
import * as styles from './ResumeCard.css';

export const ResumeCard: FC<ResumeCardProps> = ({ resume }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                {resume.title} ({resume.experience})
            </h3>
            <p>{resume.skills}</p>
            <p className={styles.date}>
                Создано: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

interface ResumeCardProps {
    resume: {
        id: string;
        title: string;
        experience: string;
        skills: string;
        createdAt: string;
    };
}
