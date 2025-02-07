import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
    minHeight: '100vh',
});

export const loginPage = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
    marginBottom: '3rem',
});

export const loginHeading = style({
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

export const tips = style({
    width: '600px',
    margin: '2rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '90%',
        },
    },
});

export const grayText = style({
    color: '#b7b7b7',
    marginRight: '1rem',
});

export const link = style({
    textDecoration: 'none',
    color: 'black',
    ':hover': {
        textDecoration: 'underline',
    },
});
