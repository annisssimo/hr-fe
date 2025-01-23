import { style } from '@vanilla-extract/css';

export const footer = style({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
    '@media': {
        'screen and (max-width: 800px)': {
            flexDirection: 'column',
        },
    },
});

export const socialMediaRow = style({
    display: 'flex',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    gap: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    '@media': {
        'screen and (max-width: 800px)': {
            marginTop: '10%',
            width: '80%',
            gap: '5%',
        },
    },
});

export const logoAndDescription = style({
    display: 'flex',
    width: '40%',
    '@media': {
        'screen and (max-width: 800px)': {
            width: '90%',
            justifyContent: 'center',
        },
    },
});

export const logo = style({
    height: '60px',
    width: '140px',
});

export const footerText = style({
    color: '#F2F2F2',
    fontSize: '14px',
    fontWeight: '450',
    margin: '2px',
    cursor: 'pointer',
});

export const contactsStyle = style({
    display: 'none',
});

export const columnWrapper = style({
    display: 'flex',
    flexDirection: 'column',
});

export const copyrightText = style({
    fontSize: '11px',
    color: '#F2F2F2',
    margin: 'auto',
});

export const underlinedText = style({
    textDecoration: 'underline',
    fontWeight: '450',
});
