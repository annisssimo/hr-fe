import { style } from '@vanilla-extract/css';

export const card = style({
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
        transform: 'scale(1.02)',
    },
});

export const title = style({
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
});

export const date = style({
    fontSize: '14px',
    color: '#666',
});
