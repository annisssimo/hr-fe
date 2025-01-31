import { style } from '@vanilla-extract/css';

export const container = style({
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative',
});

export const containerWithLeftLabelInside = style({
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    gap: '1rem',
    position: 'relative',
    width: '98%',
});

export const label = style({
    position: 'absolute',
    top: '-18px',
    zIndex: 10,
    fontWeight: 400,
    fontSize: '12px',
    color: '#737373',
});

export const leftLabel = style({
    fontSize: '16px',
    color: '#737373',
    fontWeight: 400,
    minWidth: '50px',
    maxWidth: '140px',
    textAlign: 'right',
    flexShrink: 0,
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

export const inputContainerForOutlined = style({
    maxWidth: '360px',
    flexGrow: 1,
});

export const errorMessage = style({
    color: '#d32f2f',
    fontSize: '12px',
});

export const errorMessageForPhone = style({
    color: '#d32f2f',
    fontSize: '12px',
    position: 'absolute',
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

export const outlinedInput = style({
    border: '1px solid #ccc',
    borderRadius: '4px',
});

export const errorInputForOutline = style({
    border: '1px solid #d32f2f',
});

export const disabledContainer = style({
    opacity: 0.6,
    pointerEvents: 'none',
});

export const disabledInput = style({
    backgroundColor: '#f5f5f5',
    color: '#a0a0a0',
    cursor: 'not-allowed',
    borderColor: '#d0d0d0',
});

export const inputRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});
