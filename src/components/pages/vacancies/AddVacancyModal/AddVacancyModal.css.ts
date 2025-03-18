import { style } from '@vanilla-extract/css';

export const addVacancy = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const gridRow = style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
});

export const input = style({
    width: '100%',
    padding: '8px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
});

export const textarea = style({
    width: '100%',
    padding: '8px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    resize: 'vertical',
});
