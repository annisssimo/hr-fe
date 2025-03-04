import * as styles from './ResumeComparisonPage.css';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import ResumeComparisonForm from '../../components/pages/ResumeComparisonForm/ResumeComparisonForm.tsx';
import MatchResults from '../../components/pages/ResumeComparisonForm/MatchResults.tsx';

export const ResumeComparisonPage = () => {
    return (
        <div className={styles.resumeComparisonPage}>
            <div className={styles.headerWrapper}>
                <Header />
            </div>
            <div className={styles.formWrapper}>
                <Typography variant={'h1'} className={styles.pageHeader}>
                    RESUME COMPARISON
                </Typography>
                <ResumeComparisonForm />
                <MatchResults />
            </div>
            <div className={styles.footerWrapper}>
                <Footer />
            </div>
        </div>
    );
};
