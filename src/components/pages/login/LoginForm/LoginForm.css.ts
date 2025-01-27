import { style } from '@vanilla-extract/css';

export const formContainer = style({
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.3)',
    borderTop: '6px solid #004DD7',
    borderRadius: '5px',
    padding: '80px 20px 20px 20px',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '80%',
        },
    },
});

export const inputWrapper = style({
    marginBottom: '2rem',
    height: '60px',
    width: '99%',
});

export const buttonRow = style({
    height: '50px',
});
