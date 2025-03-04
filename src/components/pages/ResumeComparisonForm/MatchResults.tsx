import React from 'react';
import { useSelector } from 'react-redux';
import { FullScreenLoader } from '../../common/FullScreenLoader/FullScreenLoader';
import { RootState } from '../../../redux/store';

const MatchResults: React.FC = () => {
    const { matchPercentage, isLoading } = useSelector((state: RootState) => state.resume);

    return (
        <div>
            {isLoading ? (
                <FullScreenLoader />
            ) : (
                <div>
                    <h2>Match Percentage</h2>
                    <p>{matchPercentage}%</p>
                </div>
            )}
        </div>
    );
};

export default MatchResults;
