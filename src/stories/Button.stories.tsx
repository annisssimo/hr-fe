import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../components/common/ButtonComponent/ButtonComponent';
import '../App.css';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['preferred', 'secondary', 'disabled', 'critical'],
            },
        },
        buttonText: { control: 'text' },
        onClick: { action: 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Preferred: Story = {
    args: {
        type: 'preferred',
        buttonText: 'Preferred Button',
        onClick: action('Preferred button clicked'),
    },
};

export const Secondary: Story = {
    args: {
        type: 'secondary',
        buttonText: 'Secondary Button',
        onClick: action('Secondary button clicked'),
    },
};

export const Disabled: Story = {
    args: {
        type: 'disabled',
        buttonText: 'Disabled Button',
        onClick: action('Disabled button clicked'),
    },
};

export const Critical: Story = {
    args: {
        type: 'critical',
        buttonText: 'Critical Button',
        onClick: action('Critical button clicked'),
    },
};
