import { style, keyframes } from '@vanilla-extract/css';

const rotate = keyframes({
    '100%': { transform: 'rotate(360deg)' },
});

const prixClipFix = keyframes({
    '0%': { clipPath: 'polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)' },
    '25%': { clipPath: 'polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)' },
    '50%': { clipPath: 'polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)' },
    '75%': { clipPath: 'polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)' },
    '100%': { clipPath: 'polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)' },
});

export const loaderIcon = style({
    borderRadius: '50%',
    position: 'relative',
    animation: `${rotate} 1s linear infinite`,
    height: 'var(--loader-height)',
    width: 'var(--loader-width)',
    ':before': {
        content: '',
        boxSizing: 'border-box',
        position: 'absolute',
        inset: '0px',
        borderRadius: '50%',
        border: '5px solid #004DD7',
        animation: `${prixClipFix} 2s linear infinite`,
    },
});

export const loaderContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
