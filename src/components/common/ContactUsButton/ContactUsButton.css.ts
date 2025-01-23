import { style, keyframes, globalStyle } from '@vanilla-extract/css';

const glow = keyframes({
    '0%': { boxShadow: '0 0 5px #004DD7, 0 0 10px #004DD7, 0 0 20px #004DD7' },
    '50%': { boxShadow: '0 0 10px #004DD7, 0 0 20px #004DD7, 0 0 40px #004DD7' },
    '100%': { boxShadow: '0 0 5px #004DD7, 0 0 10px #004DD7, 0 0 20px #004DD7' },
});

const gradient = keyframes({
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
});

const ripple = keyframes({
    '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
    '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
});

export const contactsButton = style({
    width: '20%',
    height: '70%',
    minWidth: '70px',
    minHeight: '45px',
    padding: '0',
    margin: '0',
    borderRadius: '20px',
    border: '1px solid #004DD7',
    color: '#004DD7',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
        background: 'linear-gradient(45deg, #003300, #004DD7, #003300)',
        backgroundSize: '200% 200%',
        animation: `${gradient} 3s ease infinite, ${glow} 1.5s ease infinite`,
        color: '#fff',
        border: '1px solid transparent',
        transform: 'scale(1.05)',
    },
});

globalStyle(`${contactsButton}:active::after`, {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300%',
    height: '300%',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    animation: `${ripple} 0.6s ease-out`,
});

export const contactsStyle = style({
    display: 'none',
});
