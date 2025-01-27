import { style } from '@vanilla-extract/css';

export const loginPage = style({
    width: '100%',
    height: '100vh',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0',
    padding: '0',
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
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
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
