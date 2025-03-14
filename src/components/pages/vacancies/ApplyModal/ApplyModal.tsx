import { useForm, Controller } from 'react-hook-form';
import { Modal } from '../../../common/Modal/Modal';
import { Typography } from '../../../common/Typography/Typography';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { Input as AntInput } from 'antd';

const { TextArea } = AntInput;

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (resumeId: string, coverLetter?: string, source?: string) => void;
    resumes: { id: string; title: string }[];
}

interface ApplyFormData {
    resumeId: string;
    coverLetter?: string;
    source?: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, onApply, resumes }) => {
    const { control, handleSubmit, reset } = useForm<ApplyFormData>();

    const handleFormSubmit = (data: ApplyFormData) => {
        onApply(data.resumeId, data.coverLetter, data.source);
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onConfirm={handleSubmit(handleFormSubmit)}
            onClose={onClose}
            onlyConfirm={false}
            confirmText="Отправить"
        >
            <Typography variant="h2">Откликнуться на вакансию</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Controller
                    name="resumeId"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Выберите резюме' }}
                    render={({ field: { value, onChange } }) => (
                        <Dropdown
                            label="Выберите резюме"
                            options={resumes.map((resume) => ({
                                value: resume.id,
                                label: resume.title,
                            }))}
                            selected={value}
                            onChange={onChange}
                        />
                    )}
                />
                <div>
                    <Controller
                        name="coverLetter"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                            <TextArea
                                value={value}
                                onChange={onChange}
                                placeholder="Напишите сопроводительное письмо..."
                            />
                        )}
                    />
                </div>
                <div>
                    <ControlledInput
                        name="source"
                        control={control}
                        labelText="Откуда вы узнали о вакансии?"
                        defaultValue=""
                    />
                </div>
            </div>
        </Modal>
    );
};
