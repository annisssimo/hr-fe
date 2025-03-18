import { useForm, Controller } from 'react-hook-form';
import { Upload, Button as AntButton, Select } from 'antd';
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
import { IT_SKILLS } from '../../../../constants/skills';

const { Option } = Select;

export const AddResumeModal = ({ isModalOpen, onClose }: AddResumeModalProps) => {
    const user = useSelector(getUserSelector);
    const userId = user ? user.id : '';
    const { control, handleSubmit, setValue } = useForm<ResumeFormData>({
        defaultValues: {
            title: '',
            filePath: null,
            skills: [],
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

            formData.append('skills', JSON.stringify(data.skills));
            formData.append('experience', data.experience);
            formData.append('education', data.education);

            if (data.filePath) {
                formData.append('file', data.filePath, data.filePath.name);
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
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Введите навыки"
                                tokenSeparators={[',']}
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            >
                                {IT_SKILLS.map((skill) => (
                                    <Option key={skill} value={skill}>
                                        {skill}
                                    </Option>
                                ))}
                            </Select>
                        )}
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
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-expect-error
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
    skills: string[];
    experience: string;
    education: string;
}
