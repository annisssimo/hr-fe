import { Controller, useForm } from 'react-hook-form';
import { VacancyFormData } from '../../../../types';
import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { positionOptions } from '../types';
import * as styles from './EditVacancyForm.css';
import { InputVariant } from '../../../../constants/inputVariant';

export const EditVacancyForm: React.FC<{
    vacancy: VacancyFormData;
    onSubmit: (data: VacancyFormData) => void;
}> = ({ vacancy, onSubmit }) => {
    const { control, handleSubmit } = useForm<VacancyFormData>({
        defaultValues: vacancy,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editVacancyForm}>
            <ControlledInput
                name="title"
                control={control}
                labelText="Название"
                defaultValue={vacancy.title}
                variant={InputVariant.LabelLeftOutlined}
            />
            <ControlledInput
                name="description"
                control={control}
                labelText="Описание"
                defaultValue={vacancy.description}
                variant={InputVariant.LabelLeftOutlined}
            />
            <ControlledInput
                name="skills"
                control={control}
                labelText="Навыки"
                defaultValue={vacancy.skills}
                variant={InputVariant.LabelLeftOutlined}
            />
            <Controller
                name="location"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Dropdown
                        label="Локация"
                        options={positionOptions}
                        selected={value}
                        onChange={onChange}
                        variant="large"
                    />
                )}
            />
            <ControlledInput
                name="salary"
                control={control}
                labelText="Доход"
                type="number"
                defaultValue={vacancy.salary?.toString()}
                variant={InputVariant.LabelLeftOutlined}
            />
            <div className={styles.buttonContainer}>
                <Button type="preferred" buttonText="Сохранить" onClick={handleSubmit(onSubmit)} />
            </div>
        </form>
    );
};
