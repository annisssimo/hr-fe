import { style } from '@vanilla-extract/css';

export const toggleVisibility = style({
    position: 'absolute',
    top: '50%',
    right: '-4px',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: '#737373',
    fontSize: '20px',
    display: 'flex',
});
