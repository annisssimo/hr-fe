import { useForm, Controller } from 'react-hook-form';
import { Upload, Button as AntButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { InputVariant } from '../../../../constants/inputVariant';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { Modal } from '../../../common/Modal/Modal';
import { gridContainer, gridItem, gridItemFull } from './AddResumeModal.css';
import { useCreateResumeMutation } from '../../../../services/resumes.api';
import { Loader } from '../../../common/Loader/Loader';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../../redux/userSlice/userSlice';

export const AddResumeModal = ({ isModalOpen, onClose }: AddResumeModalProps) => {
    const user = useSelector(getUserSelector);
    const userId = user ? user.id : '';
    const { control, handleSubmit, setValue } = useForm<ResumeFormData>({
        defaultValues: {
            title: '',
            filePath: null,
            skills: '',
            experience: '',
            education: '',
        },
    });
    const [file, setFile] = useState<File | null>(null);
    const [createResume, { isLoading }] = useCreateResumeMutation();

    const onSubmit = async (data: ResumeFormData) => {
        try {
            const formData = new FormData();
            formData.append('candidateId', userId);
            formData.append('title', data.title);
            formData.append('skills', data.skills);
            formData.append('experience', data.experience);
            formData.append('education', data.education);
            if (data.filePath) {
                formData.append('file', data.filePath, data.filePath.name);
            }

            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            await createResume(formData).unwrap();
            onClose();
        } catch (error) {
            console.error('Error creating resume:', error);
        }
    };

    const handleFileChange = ({ file }: { file: File }) => {
        if (file) {
            setFile(file);
            setValue('filePath', file);
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={onClose}
            onConfirm={handleSubmit(onSubmit)}
            confirmText="Сохранить"
            width="60rem"
            maxHeight="80vh"
        >
            <h2>Добавление нового резюме</h2>
            <div className={gridContainer}>
                <div className={gridItem}>
                    <ControlledInput
                        name="title"
                        control={control}
                        labelText="Название"
                        variant={InputVariant.LabelTop}
                    />
                </div>
                <div className={gridItem}>
                    <ControlledInput
                        name="skills"
                        control={control}
                        labelText="Навыки"
                        variant={InputVariant.LabelTop}
                    />
                </div>
                <div className={gridItem}>
                    <ControlledInput
                        name="experience"
                        control={control}
                        labelText="Опыт"
                        variant={InputVariant.LabelTop}
                    />
                </div>
                <div className={gridItem}>
                    <ControlledInput
                        name="education"
                        control={control}
                        labelText="Образование"
                        variant={InputVariant.LabelTop}
                    />
                </div>
                <div className={gridItemFull}>
                    <Controller
                        name="filePath"
                        control={control}
                        render={() => (
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                                showUploadList={false}
                            >
                                <AntButton icon={<UploadOutlined />}>
                                    Загрузите резюме (PDF)
                                </AntButton>
                                {file && <p>Uploaded: {file.name}</p>}
                            </Upload>
                        )}
                    />
                </div>
            </div>
            {isLoading && <Loader />}
        </Modal>
    );
};

interface AddResumeModalProps {
    isModalOpen: boolean;
    onClose: () => void;
}

interface ResumeFormData {
    title: string;
    filePath: File | null;
    skills: string;
    experience: string;
    education: string;
}
