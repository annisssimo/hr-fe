import { style } from '@vanilla-extract/css';

export const registrationPage = style({
    width: '100%',
    height: '100vh',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
});

export const registrationHeader = style({
    borderBottom: '4px solid #004DD7',
    padding: '0px 0px 10px 0px',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '2rem',
            padding: '0px 0px 10px 0px',
        },
    },
});

export const headerWrapper = style({
    width: '100%',
    position: 'absolute',
    top: '0',
});

export const footerWrapper = style({
    width: '100%',
    position: 'absolute',
    bottom: '0',
});
