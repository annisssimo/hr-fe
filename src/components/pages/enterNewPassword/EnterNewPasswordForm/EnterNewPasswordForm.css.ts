import { style } from '@vanilla-extract/css';

export const formWrapper = style({
    width: '100%',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    top: '-20px',
});

export const formContainer = style({
    backgroundColor: '#F8FBFD',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.3)',
    borderTop: '6px solid #004DD7',
    borderRadius: '5px',
    padding: '40px 20px 20px 20px',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '80%',
            padding: '10px 20px 20px 20px',
        },
    },
});

export const inputWrapper = style({
    marginBottom: '30px',
});

export const buttonRow = style({
    display: 'flex',
    gap: '25%',
    width: '80%',
    margin: 'auto',
    height: '50px',
});
