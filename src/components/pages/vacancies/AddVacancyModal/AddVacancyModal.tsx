import { useForm, Controller } from 'react-hook-form';
import { Modal } from '../../../common/Modal/Modal';
import { Typography } from '../../../common/Typography/Typography';
import { VacancyFormData } from '../../../../types';
import { Select, Input as AntInput } from 'antd';
import { positionOptions } from '../types';
import { IT_SKILLS } from '../../../../constants/skills';
import { addVacancy, gridRow, input, textarea } from './AddVacancyModal.css';

const { Option } = Select;

const { TextArea } = AntInput;

interface AddVacancyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: VacancyFormData) => void;
}

export const AddVacancyModal: React.FC<AddVacancyModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { control, handleSubmit, reset } = useForm<VacancyFormData>();

    const handleFormSubmit = (data: VacancyFormData) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onConfirm={handleSubmit(handleFormSubmit)}
            onClose={onClose}
            onlyConfirm={false}
            confirmText="Создать"
        >
            <Typography variant="h2">Добавление вакансии</Typography>
            <div className={addVacancy}>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <AntInput {...field} placeholder="Название" className={input} />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextArea {...field} placeholder="Описание" rows={4} className={textarea} />
                    )}
                />

                <div className={gridRow}>
                    <Controller
                        name="skills"
                        control={control}
                        defaultValue={undefined}
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

                    <Controller
                        name="location"
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Select
                                {...field}
                                style={{ width: '100%' }}
                                placeholder="Выберите локацию"
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            >
                                {positionOptions.map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>

                <Controller
                    name="salary"
                    control={control}
                    defaultValue={undefined}
                    render={({ field }) => (
                        <AntInput {...field} placeholder="Доход" type="number" className={input} />
                    )}
                />
            </div>
        </Modal>
    );
};
