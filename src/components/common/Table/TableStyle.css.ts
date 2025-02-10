import { style, globalStyle } from '@vanilla-extract/css';
import { baseButton } from '../ButtonComponent/ButtonComponentStyle.css.ts';

export const tableContainer = style({
    width: '100%',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginTop: '20px',
    position: 'relative',
});

export const table = style({
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
});

export const tableHeader = style({
    backgroundColor: '#F8FBFD',
    borderBottom: '2px solid #E0E0E0',
    fontSize: '1rem',
    fontWeight: 600,
});

export const tableRow = style({
    borderBottom: '1px solid #E0E0E0',
    ':hover': {
        backgroundColor: '#E6E6E6',
        cursor: 'pointer',
    },
});

export const tableCell = style({
    padding: '10px 15px',
    fontSize: '0.9rem',
    wordBreak: 'break-word',
    boxSizing: 'border-box',
});

export const tableCellHeader = style({
    padding: '10px 15px',
    fontSize: '1rem',
    fontWeight: 500,
    boxSizing: 'border-box',
});

export const tableFooter = style({
    width: 'calc(100%-15px)',
    display: 'flex',
    justifyContent: 'right',
    padding: '10px 15px',
});

export const placeholder = style({
    width: '90%',
    backgroundColor: '#F8FBFD',
    borderRadius: '8px',
});

export const loaderContainer = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
});

export const paginationBar = style({
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    gap: '10px',
    '@media': {
        'screen and (max-width: 768px)': {
            gap: '5px',
        },
    },
});

export const buttonWrapper = style({
    width: '30px',
    height: '30px',
});

export const paginationCounter = style({
    color: '#004DD7',
    fontSize: '1rem',
});

globalStyle(`${buttonWrapper} ${baseButton}`, {
    padding: '4px 8px',
});
