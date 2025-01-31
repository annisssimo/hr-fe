import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '200px',
});

export const containerWithLeftLabelInside = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    gap: '1rem',
    position: 'relative',
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

export const leftLabel = style({
    fontSize: '16px',
    color: '#737373',
    fontWeight: 400,
    minWidth: '50px',
    maxWidth: '140px',
    textAlign: 'right',
    flexShrink: 0,
});

export const select = style({
    color: '#333',
    borderRadius: '4px',
    cursor: 'pointer',
    appearance: 'none',
    position: 'relative',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const selectForSmall = style({
    padding: '16px 12px',
    border: '1.5px solid #004DD7',
    fontSize: '14px',
});

export const selectForLarge = style({
    maxWidth: '362px',
    height: '20px',
    flexGrow: 1,
    border: '1px solid #ccc',
    padding: '8px 4px',
});

export const dropdown = style({
    position: 'absolute',
    top: '100%',
    marginTop: '0px',
    padding: '8px 0',
    backgroundColor: 'white',
    boxShadow: '0px 5px 5px 0px #b0b0b0',
    borderRadius: '4px',
    zIndex: 10,
    listStyle: 'none',
    overflowY: 'auto',
});

export const dropdownForSmall = style({
    left: 0,
    right: 0,
    maxHeight: '150px',
});

export const dropdownForLarge = style({
    right: 0,
    maxHeight: '300px',
    width: '371px',
});

export const dropdownItem = style({
    padding: '8px 12px',

    color: '#333',
    cursor: 'pointer',
    ':hover': {
        backgroundColor: '#e9f0fd',
    },
});

export const dropdownItemForSmall = style({
    fontSize: '14px',
});

export const dropdownItemForLarge = style({
    fontSize: '16px',
});

export const triangle = style({
    color: '#737373',
});
