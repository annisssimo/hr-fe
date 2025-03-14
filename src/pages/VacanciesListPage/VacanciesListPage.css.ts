import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

export const contentWrapper = style({
    width: '80%',
    flex: 1,
    margin: '20px auto',
    padding: '20px',
});
