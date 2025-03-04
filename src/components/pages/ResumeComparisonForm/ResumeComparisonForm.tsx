import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/resumeSlice/resumeSlice';
import { useCompareResumesMutation } from '../../../services/resume.api';
import * as styles from './ResumeComparisonForm.css.ts';
import { Button } from '../../common/ButtonComponent/ButtonComponent';

const ResumeComparisonForm: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [jobDescription, setJobDescription] = useState<string>('');
    const [compareResumes, { isLoading, isError }] = useCompareResumesMutation();
    const dispatch = useDispatch();
    const [results, setResults] = useState<any[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));

        if (files) {
            try {
                const resumePromises = Array.from(files).map(async (file) => {
                    const resumeText = await file.text();
                    const result = await compareResumes({
                        resumeText,
                        jobText: jobDescription,
                    }).unwrap();
                    return {
                        fileName: file.name,
                        matchPercentage: result.matchPercentage,
                    };
                });

                const results = await Promise.all(resumePromises);
                setResults(results);
            } catch (error) {
                console.error('Error comparing resumes:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Upload Resumes</label>
                <input type="file" accept=".pdf,.docx," multiple onChange={handleFileChange} />
            </div>
            <br />
            <br />
            <div>
                <label>Job Description</label>
                <br />
                <textarea
                    className={styles.textarea}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here"
                />
            </div>

            <Button
                type={isLoading ? 'disabled' : 'preferred'}
                buttonText="Compare Resumes"
                onClick={handleSubmit}
            />

            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong!</p>}

            {results.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Resume Name</th>
                            <th>Match Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.fileName}</td>
                                <td>{result.matchPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </form>
    );
};

export default ResumeComparisonForm;
