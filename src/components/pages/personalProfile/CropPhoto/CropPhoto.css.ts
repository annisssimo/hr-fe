import { style, globalStyle } from '@vanilla-extract/css';

export const cropContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '80vh',
    overflow: 'hidden',
});

export const zoomContainer = style({
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
});

globalStyle(`${cropContainer} img`, {
    maxHeight: 'calc(80vh - 6rem)',
    objectFit: 'contain',
});
