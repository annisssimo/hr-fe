import { style } from '@vanilla-extract/css';

export const formContainer = style({
    backgroundColor: '#F8FBFD',
    width: '700px',
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

export const formGrid = style({
    display: 'grid',
    gap: '15px',
    marginBottom: '30px',
    '@media': {
        'screen and (max-width: 768px)': {
            marginBottom: '15px',
        },
    },
});

export const formGrid2 = style({
    gridTemplateColumns: 'repeat(2, 1fr)',
});

export const twoPerRow = style([formGrid, formGrid2]);

export const buttonRow = style({
    display: 'flex',
    gap: '25%',
    width: '80%',
    margin: 'auto',
    height: '50px',
});

export const inputWrapper = style({
    marginTop: 'auto',
});

export const noMarginTop = style({
    marginTop: '0px',
});
