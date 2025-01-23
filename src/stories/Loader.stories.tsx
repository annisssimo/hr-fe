import { Meta, StoryObj } from '@storybook/react';

import { FullScreenLoader } from '../components/common/FullScreenLoader/FullScreenLoader';
import { Loader } from '../components/common/Loader/Loader';
import '../App.css';

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
    argTypes: {
        customWidth: { control: { type: 'number' } },
        customHeight: { control: { type: 'number' } },
    },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
    args: {
        customWidth: 60,
        customHeight: 60,
    },
};

export const Small: Story = {
    args: {
        customWidth: 30,
        customHeight: 30,
    },
};

export const Large: Story = {
    args: {
        customWidth: 100,
        customHeight: 100,
    },
};

export const FullScreen: StoryObj<typeof FullScreenLoader> = {};
