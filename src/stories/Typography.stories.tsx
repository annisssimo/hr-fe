import { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../components/common/Typography/Typography';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['h1', 'h2', 'h3', 'h4', 'h5', 'text', 'paragraph', 'link'],
            },
        },
        href: { control: 'text' },
        target: {
            control: { type: 'select' },
            options: ['_self', '_blank'],
        },
        copyable: { control: 'boolean' },
        type: {
            control: { type: 'select' },
            options: ['secondary', 'success', 'warning', 'danger', undefined],
        },
        children: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
    args: {
        variant: 'h1',
        children: 'This is an H1 heading',
    },
};

export const Heading2: Story = {
    args: {
        variant: 'h2',
        children: 'This is an H2 heading',
    },
};

export const Paragraph: Story = {
    args: {
        variant: 'paragraph',
        children: 'This is a paragraph.',
    },
};

export const CopyableParagraph: Story = {
    args: {
        variant: 'paragraph',
        children: 'This is a paragraph. You can copy this text.',
        copyable: true,
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Click me!',
        href: 'https://example.com',
        target: '_blank',
    },
};

export const DangerText: Story = {
    args: {
        variant: 'text',
        children: 'This is a danger text',
        type: 'danger',
    },
};

export const SuccessText: Story = {
    args: {
        variant: 'text',
        children: 'This is a success text',
        type: 'success',
    },
};
