import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input } from '../components/common/Input/Input';
import { MdVisibilityOff } from 'react-icons/md';

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        value: { control: 'text' },
        onChange: { action: 'changed' },
        error: { control: 'text' },
        labelText: { control: 'text' },
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'tel', 'date'],
        },
        endAdornment: { control: 'object' },
    },
} as Meta;

const Template: StoryFn = (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
    labelText: 'Enter text',
    value: '',
    error: '',
};

export const WithError = Template.bind({});
WithError.args = {
    labelText: 'Enter text',
    value: '',
    error: 'This field is required',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
    labelText: 'Password',
    value: '',
    type: 'password',
    error: '',
    endAdornment: <MdVisibilityOff />,
};
