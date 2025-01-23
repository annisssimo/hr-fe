import { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from '../components/common/Dropdown/Dropdown';
import '../App.css';

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    argTypes: {
        label: { control: 'text' },
        options: { control: 'object' },
        selected: { control: 'text' },
        onChange: { action: 'selected' },
    },
};

export default meta;

export const DefaultDropdown: StoryObj<typeof Dropdown> = {
    args: {
        label: 'Select an option',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ],
    },
};
