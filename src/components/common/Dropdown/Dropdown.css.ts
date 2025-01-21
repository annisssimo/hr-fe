import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '200px',
});

export const label = style({
    position: 'absolute',
    zIndex: '1',
    top: '-7.5px',
    left: '8px',
    fontSize: '12px',
    fontWeight: '300',
    color: '#004DD7',
    backgroundColor: '#fff',
    padding: '0 6px',
});

export const select = style({
    padding: '16px 12px',
    fontSize: '14px',
    color: '#333',
    border: '1.5px solid #004DD7',
    borderRadius: '4px',
    cursor: 'pointer',
    appearance: 'none',
    position: 'relative',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const dropdown = style({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '0px',
    padding: '8px 0',
    backgroundColor: 'white',
    boxShadow: '0px 5px 5px 0px #b0b0b0',
    borderRadius: '4px',
    zIndex: 10,
    listStyle: 'none',
    maxHeight: '150px',
    overflowY: 'auto',
});

export const dropdownItem = style({
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    ':hover': {
        backgroundColor: '#e9f0fd',
    },
});

export const triangle = style({
    color: '#737373',
});
