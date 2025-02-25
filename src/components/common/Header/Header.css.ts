import { style } from '@vanilla-extract/css';

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 48px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
});

export const logo = style({
    fontSize: '24px',
    fontWeight: 'bold',
    position: 'relative',
    top: '3px',
});

export const nav = style({
    display: 'flex',
});

export const navList = style({
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '80px',
    '@media': {
        'screen and (max-width: 800px)': {
            gap: '20px',
        },
    },
});

export const navItem = style({
    all: 'unset',
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '18px',
    cursor: 'pointer',
    position: 'relative',
    paddingBottom: '28px',
    transition: '0.3s',
    ':hover': {
        color: '#b0b0b0',
    },
    selectors: {
        '&:after': {
            content: '""',
            background: 'linear-gradient(to right, #004DD7,#4987fb)',
            display: 'block',
            width: '100%',
            height: '6px',
            backgroundColor: 'blue',
            position: 'absolute',
            bottom: '0',
            left: '0',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s ease-in-out',
        },
        '&:hover:after': {
            transform: 'scaleX(1)',
        },
    },
    '@media': {
        'screen and (max-width: 800px)': {
            fontSize: '16px',
            paddingBottom: '16px',
        },
    },
});

export const userProfile = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '@media': {
        'screen and (max-width: 800px)': {
            gap: '5px',
        },
    },
});

export const userAvatar = style({
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
});

export const dropdownMenu = style({
    position: 'absolute',
    top: '68px',
    right: '48px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
});

export const menuItem = style({
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#333',
    ':hover': {
        backgroundColor: '#f2f2f2',
    },
});
