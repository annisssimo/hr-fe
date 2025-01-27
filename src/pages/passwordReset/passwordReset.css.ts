import { style } from '@vanilla-extract/css';

export const resetPasswordPage = style({
    width: '100%',
    height: '77vh',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0',
    padding: '0',
});

export const resetPasswordHeading = style({
    borderBottom: '4px solid #004DD7',
    margin: '2rem',
    padding: '0px 0px 40px 0px',
    fontSize: '3rem',
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '2rem',
            padding: '0px 0px 20px 0px',
        },
    },
});
