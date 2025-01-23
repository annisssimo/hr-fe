import { style } from '@vanilla-extract/css';

export const container = style({
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const label = style({
    fontWeight: 400,
    fontSize: '12px',
    color: '#737373',
});

export const input = style({
    width: '100%',
    padding: '8px 4px',
    border: 'none',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'background-color 0.3s ease',
    ':focus': {
        backgroundColor: '#e9f0fd',
    },
});

export const inputContainer = style({
    position: 'relative',
});

export const errorMessage = style({
    color: '#d32f2f',
    fontSize: '12px',
});

export const errorInput = style({
    borderBottom: '1px solid #d32f2f',
});

export const errorLabel = style({
    color: '#d32f2f',
});

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
