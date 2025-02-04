import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
});

export const fileInput = style({
    display: 'none',
});

export const imagePreview = style({
    marginTop: '20px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
});

export const image = style({
    maxWidth: '100%',
    height: '60vh',
    objectFit: 'contain',
});
