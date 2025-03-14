import { style } from '@vanilla-extract/css';

export const listContainer = style({
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    padding: '20px',
});

export const loadingText = style({
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
});

export const emptyText = style({
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
});
