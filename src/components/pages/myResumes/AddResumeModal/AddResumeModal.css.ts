import { style } from '@vanilla-extract/css';

export const gridContainer = style({
    marginTop: '20px',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '36px',
});

export const gridItem = style({
    display: 'flex',
    flexDirection: 'column',
});

export const gridItemFull = style({
    gridColumn: 'span 2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});
