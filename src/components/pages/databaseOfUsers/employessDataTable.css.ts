import { globalStyle, style } from '@vanilla-extract/css';
import { container } from '../../common/Dropdown/Dropdown.css.ts';
import { selectForSmall } from '../../common/Dropdown/Dropdown.css.ts';

export const tableHeader = style({
    width: '100%',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
    '@media': {
        'screen and (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '20vh',
        },
    },
});

export const partContainer = style({
    display: 'flex',
    flexDirection: 'row',
    width: '55%',
    alignItems: 'center',
    justifyContent: 'left',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '100%',
        },
    },
});

export const pageTitle = style({
    color: '#004DD7',
    fontWeight: '300 !important',
    marginBottom: '0',
    marginRight: '5%',
});

export const buttonRow = style({
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '80%',
        },
    },
});

export const rightPartContainer = style({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    width: '45%',
    '@media': {
        'screen and (max-width: 768px)': {
            width: '100%',
            justifyContent: 'left',
        },
    },
});

export const searchContainer = style({
    width: '60%',
});

export const searchButton = style({
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent',
    marginLeft: '5%',
    border: 'none',
});

export const searchIcon = style({
    width: '100%',
    height: '100%',
    marginRight: '10%',
});

export const hiddenBlock = style({
    display: 'none',
});

export const dropdownAndText = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
});

globalStyle(`${dropdownAndText} ${container}`, {
    width: '50px',
    zIndex: '200',
});

globalStyle(`${dropdownAndText} ${container} ${selectForSmall}`, {
    padding: '9px 6px',
});
