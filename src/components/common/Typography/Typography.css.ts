import { style } from '@vanilla-extract/css';

export const title = style({
    fontWeight: 'bold',
    margin: '0 0 16px 0',
});

export const text = style({
    margin: '0',
});

export const textVariants = {
    secondary: style({ color: '#8c8c8c' }),
    success: style({ color: '#52c41a' }),
    warning: style({ color: '#faad14' }),
    danger: style({ color: '#f5222d' }),
    disabled: style({ color: '#d9d9d9' }),
};

export const paragraphWrapper = style({
    display: 'flex',
    alignItems: 'center',
});

export const paragraph = style({
    margin: '0 0 16px 0',
});

export const copyButton = style({
    position: 'relative',
    bottom: '6px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#004DD7',
    transition: 'opacity 0.2s',
    ':hover': {
        opacity: 0.7,
    },
});

export const link = style({
    color: '#1890ff',
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
});
