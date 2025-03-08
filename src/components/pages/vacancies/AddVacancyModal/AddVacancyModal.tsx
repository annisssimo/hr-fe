import { useForm, Controller } from 'react-hook-form';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { Modal } from '../../../common/Modal/Modal';
import { Typography } from '../../../common/Typography/Typography';
import { VacancyFormData } from '../../../../types';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import * as styles from './AddVacancyModal.css';
import { positionOptions } from '../types';

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
            <div className={styles.addVacancy}>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={() => (
                        <ControlledInput
                            name="title"
                            control={control}
                            labelText="Название"
                            defaultValue=""
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={() => (
                        <ControlledInput
                            name="description"
                            control={control}
                            labelText="Описание"
                            defaultValue=""
                        />
                    )}
                />
                <Controller
                    name="skills"
                    control={control}
                    defaultValue=""
                    render={() => (
                        <ControlledInput
                            name="skills"
                            control={control}
                            labelText="Навыки"
                            defaultValue=""
                        />
                    )}
                />
                <Controller
                    name="location"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                        <Dropdown
                            label="Локация"
                            options={positionOptions}
                            selected={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    name="salary"
                    control={control}
                    defaultValue={undefined}
                    render={() => (
                        <ControlledInput
                            name="salary"
                            control={control}
                            labelText="Доход"
                            type="number"
                            defaultValue={undefined}
                        />
                    )}
                />
            </div>
        </Modal>
    );
};
