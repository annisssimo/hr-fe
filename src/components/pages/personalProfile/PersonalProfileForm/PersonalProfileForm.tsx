import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../../common/ButtonComponent/ButtonComponent';
import { Typography } from '../../../common/Typography/Typography';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { ControlledInput } from '../../../common/ControlledInput/ControlledInput';
import { InputVariant } from '../../../../constants/inputVariant.ts';
import { PhoneInputWithMask } from '../../../common/PhoneInputWithMask/PhoneInputWithMask';
import defaultAvatar from '../../../../assets/default-avatar.jpg';
import { ROUTES } from '../../../../constants/routes';
import { personalProfileFormSchema } from './personalProfileForm.schema';
import * as styles from './PersonalProfileForm.css';

export const PersonalProfileForm = ({ user }: PersonalProfileFormProps) => {
    const navigate = useNavigate();

    const canEditEndDate = false; // send a request to the API to find out if the user has rights

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(personalProfileFormSchema),
        defaultValues: {
            position: user.position || '',
            startDay: user.startDay || '',
            endDate: user.endDate || '',
            dateOfBirth: user.dateOfBirth || '',
            phoneNumber: user.phoneNumber || '',
            skypeTelegram: user.skypeTelegram || '',
        },
    });

    const onSubmit = (data: Omit<User, 'role' | 'name' | 'surname' | 'email'>) => {
        const cleanedData = {
            ...data,
            phoneNumber: `+${data.phoneNumber?.replace(/\D/g, '')}`,
        };

        console.log(cleanedData);
        navigate(ROUTES.HOME);
    };

    const handleChangePassword = () => {
        navigate(ROUTES.CHANGE_PASSWORD);
    };

    const positionOptions = [
        { label: 'HR', value: 'hr' },
        { label: 'Front-end Developer', value: 'frontendDev' },
        { label: 'Back-end Developer', value: 'backendDev' },
        { label: 'DevOps', value: 'devOps' },
        { label: 'Android/iOS Developer', value: 'mobileDev' },
        { label: 'Assistant', value: 'assistant' },
        { label: 'PM', value: 'pm' },
        { label: 'CEO', value: 'ceo' },
        { label: 'CTO', value: 'cto' },
        { label: 'Recruiter', value: 'recruiter' },
        { label: 'QA', value: 'qa' },
        { label: 'Team Lead', value: 'teamLead' },
        { label: 'Designer', value: 'designer' },
        { label: 'Sales Manager', value: 'sales' },
    ];

    return (
        <div className={styles.profileMain}>
            <Typography variant="h1">Personal Profile</Typography>

            <div className={styles.avatarContainer}>
                <img
                    src={user.avatar || defaultAvatar}
                    alt={`${user.name}'s avatar`}
                    className={styles.avatarImage}
                />
            </div>

            <form className={styles.personalProfilePageForm} onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    labelText="Name"
                    type="text"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled
                />

                <ControlledInput
                    name="surname"
                    control={control}
                    defaultValue={user.surname}
                    labelText="Surname"
                    type="text"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled
                />

                <ControlledInput
                    name="email"
                    control={control}
                    defaultValue={user.email}
                    labelText="Email"
                    type="email"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled
                />

                <Controller
                    name="position"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Dropdown
                            label="Position"
                            options={positionOptions}
                            selected={value}
                            onChange={onChange}
                            variant="large"
                        />
                    )}
                />

                <ControlledInput
                    name="startDay"
                    control={control}
                    labelText="Starting Day in the company"
                    type="date"
                    variant={InputVariant.LabelLeftOutlined}
                />

                <ControlledInput
                    name="endDate"
                    control={control}
                    labelText="End Date"
                    type="date"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled={!canEditEndDate}
                />

                <ControlledInput
                    name="dateOfBirth"
                    control={control}
                    labelText="Date of Birth"
                    type="date"
                    variant={InputVariant.LabelLeftOutlined}
                />

                <PhoneInputWithMask
                    name="phoneNumber"
                    control={control}
                    labelText="Phone number"
                    error={errors.phoneNumber}
                />

                <ControlledInput
                    name="skypeTelegram"
                    control={control}
                    labelText="Skype or Telegram Username"
                    type="text"
                    variant={InputVariant.LabelLeftOutlined}
                />

                <div className={styles.buttonsContainer}>
                    <Button
                        type="secondary"
                        buttonText={'Change Password'}
                        onClick={handleChangePassword}
                    />

                    <Button type="preferred" buttonText={'Save'} onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </div>
    );
};

export interface User {
    role: 'admin' | 'manager' | 'employee';
    avatar?: string | null;
    name: string;
    surname: string;
    email: string;
    position?: string;
    startDay?: string;
    endDate?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    skypeTelegram?: string;
}

interface PersonalProfileFormProps {
    user: User;
}
