import { Meta, StoryObj } from '@storybook/react';

import '../App.css';
import { PhoneInputWithMask } from '../components/common/PhoneInputWithMask/PhoneInputWithMask';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof PhoneInputWithMask> = {
    title: 'Components/Input',
    component: PhoneInputWithMask,
};

export default meta;

type Story = StoryObj<typeof PhoneInputWithMask>;

const PhoneInputStory = () => {
    const { control } = useForm();
    return <PhoneInputWithMask name="phone" control={control} labelText="Phone Number" />;
};

export const PhoneInput: Story = {
    render: () => <PhoneInputStory />,
};
