import { style } from '@vanilla-extract/css';

export const resumeComparisonPage = style({
    width: '100%',
    minHeight: '100vh',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
});

export const pageHeader = style({
    borderBottom: '4px solid #004DD7',
    padding: '0px 0px 40px 0px',
    fontSize: '3rem',
    margin: '2rem',
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '2rem',
            padding: '0px 0px 10px 0px',
        },
    },
});

export const headerWrapper = style({
    width: '100%',
});

export const footerWrapper = style({
    width: '100%',
});

export const formWrapper = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
    marginBottom: '2rem',
});
