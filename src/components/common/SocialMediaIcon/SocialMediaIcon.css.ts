import { style, keyframes } from '@vanilla-extract/css';

const shake = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(-25deg)' },
    '50%': { transform: 'rotate(25deg)' },
    '75%': { transform: 'rotate(-25deg)' },
    '100%': { transform: 'rotate(0deg)' },
});

const popUp = keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.4)' },
    '100%': { transform: 'scale(1)' },
});

export const iconContainer = style({
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    ':hover': {
        animation: `${popUp} 0.5s ease, ${shake} 0.5s ease`,
    },
});

export const svgWrapper = style({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
});
