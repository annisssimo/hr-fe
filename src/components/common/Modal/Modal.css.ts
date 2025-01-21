import { style } from '@vanilla-extract/css';

export const modal = style({
    position: 'relative',
    maxWidth: '20rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0 0.5rem 0.25rem hsl(0 0% 0% / 10%)',
    border: 0,
    padding: 0,
});

export const formInsideDialog = style({
    padding: '2rem',
});

export const controlButtonsContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    marginTop: '2rem',
});
