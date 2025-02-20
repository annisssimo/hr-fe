import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
import { Photo } from '../Photo/Photo.tsx';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/UI/toastMessages.ts';
import { Loader } from '../../../common/Loader/Loader.tsx';
import { useUpdateUserProfileMutation } from '../../../../services/users.api.ts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, USER_ROLE } from '../../../../constants/index.ts';
import { CustomError, User } from '../../../../types/index.ts';
import { handleAxiosError } from '../../../../utils/handleAxiosError.ts';
import { useUpdateUserMutation } from '../../../../services/users.api.ts';
import { getUserSelector } from '../../../../redux/userSlice/userSlice.ts';

export const PersonalProfileForm = ({ user }: PersonalProfileFormProps) => {
    const navigate = useNavigate();
    const [updateUser] = useUpdateUserMutation();
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const reduxUser = useSelector(getUserSelector);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<User>({
        resolver: zodResolver(personalProfileFormSchema),
    });

    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                position: user.position || '',
                startDay: user.startDay || undefined,
                endDate: user.endDate || undefined,
                dateOfBirth: user.dateOfBirth || undefined,
                phoneNumber: user.phoneNumber || '',
                contactUsername: user.contactUsername || '',
            });
        }
    }, [user, reset]);

    const currentUser = useSelector(getUserSelector);

    const canEditEndDate = (() => {
        if (!currentUser || !user) return false;

        if (currentUser.role === USER_ROLE.ADMIN) {
            return true;
        }

        if (currentUser.role === USER_ROLE.MANAGER) {
            return user.id !== currentUser.id;
        }

        return user.managerId === currentUser.id;
    })();

    const onSubmit = async (data: User) => {
        const cleanedData = {
            ...data,
            id: user?.id,
            phoneNumber: `+${data.phoneNumber?.replace(/\D/g, '')}`,
            startDay: data.startDay ? new Date(data.startDay) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        };

        try {
            await updateUserProfile(cleanedData).unwrap();
            showSuccessMessage(SUCCESS_MESSAGES.PROFILE_UPDATED);
            navigate(ROUTES.HOME);
        } catch (error) {
            const errorMessage = (error as CustomError).data || ERROR_MESSAGES.SERVER_ERROR;
            showErrorMessage(errorMessage);
        }
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

    const handleDeletePhoto = async () => {
        try {
            await updateUser({
                userId: reduxUser?.id || '',
                body: {
                    avatar: null,
                },
            }).unwrap();
            showSuccessMessage(SUCCESS_MESSAGES.PROFILE_UPDATED);
            navigate(ROUTES.HOME);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const showChangePhoto = () => {
        setIsPhotoModalOpen(true);
    };

    return (
        <div className={styles.profileMain}>
            <Typography variant="h1">Personal Profile</Typography>

            <div className={styles.avatarContainer}>
                <img
                    src={user?.avatar || defaultAvatar}
                    alt={`${user?.firstName}'s avatar`}
                    className={styles.avatarImage}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button type={'preferred'} buttonText={'Change photo'} onClick={showChangePhoto} />
                <Button type={'critical'} buttonText={'Delete photo'} onClick={handleDeletePhoto} />
            </div>
            {isPhotoModalOpen && (
                <Photo isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} />
            )}

            <form className={styles.personalProfilePageForm} onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput
                    name="firstName"
                    control={control}
                    defaultValue={user?.firstName}
                    labelText="Name"
                    type="text"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled
                />

                <ControlledInput
                    name="lastName"
                    control={control}
                    defaultValue={user?.lastName}
                    labelText="Surname"
                    type="text"
                    variant={InputVariant.LabelLeftOutlined}
                    disabled
                />

                <ControlledInput
                    name="email"
                    control={control}
                    defaultValue={user?.email}
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
                    name="contactUsername"
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
            {isLoading && <Loader />}
        </div>
    );
};

interface PersonalProfileFormProps {
    user: User | null | undefined;
}
