import { keyframes, style } from '@vanilla-extract/css';

const clickAnimation = keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
});

export const baseButton = style({
    border: 'none',
    borderRadius: '4px',
    width: '100%',
    height: '100%',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.3)',
    padding: '8px 16px',
    fontSize: '1rem',
    transition: 'transform 0.1s ease, background-color 0.2s ease',
    selectors: {
        '&:active': {
            animationName: clickAnimation,
            animationDuration: '150ms',
            animationTimingFunction: 'ease-out',
        },
    },
});

export const preferredButton = style({
    backgroundColor: '#004DD7',
    ':hover': {
        backgroundColor: '#003BAA',
    },
});

export const preferredText = style({
    color: '#F8FBFD',
});

export const secondaryButton = style({
    backgroundColor: '#F2F2F2',
    ':hover': {
        backgroundColor: '#E6E6E6',
    },
});

export const secondaryText = style({
    color: '#252626',
});

export const disabledButton = style({
    backgroundColor: '#E0E0E0',
});

export const disabledText = style({
    color: '#A9A8A7',
});

export const criticalButton = style({
    backgroundColor: '#d11440',
    ':hover': {
        backgroundColor: '#b01236',
    },
});

export const criticalText = style({
    color: '#f9fcfd',
});

export const baseButtonText = style({
    margin: '0',
    padding: '0',
    fontSize: '0.9rem',
    letterSpacing: '0.02rem',
    textAlign: 'center',
});

const shake = keyframes({
    '0%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-5px)' },
    '50%': { transform: 'translateX(5px)' },
    '75%': { transform: 'translateX(-5px)' },
    '100%': { transform: 'translateX(0)' },
});

export const disabledAnim = style({
    animationName: shake,
    animationDuration: '300ms',
});
