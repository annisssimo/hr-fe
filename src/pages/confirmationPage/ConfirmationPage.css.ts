import { style, globalStyle } from '@vanilla-extract/css';
import { tableContainer } from '../../components/common/Table/TableStyle.css.ts';

export const confirmationPageWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
});

export const headerWrapper = style({
    width: '100%',
});

export const confirmationPageFooter = style({
    width: '100%',
});

export const pageTitle = style({
    color: '#004DD7',
    fontWeight: '300 !important',
});

export const confirmationPageContent = style({
    width: '95%',
    margin: '50px 0',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    minHeight: '65vh',
});

export const tableMenu = style({
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    margin: '0',
    borderBottom: '1px solid #E0E0E0',
    width: '98%',
    padding: '1% 1% 0px 1%',
});

export const tableMenuItemSelected = style({
    color: '#004DD7',
    fontWeight: '300 !important',
    borderBottom: '1px solid #004DD7',
    cursor: 'pointer',
});

export const tableMenuItem = style({
    color: '#A9A8A7',
    fontWeight: '300 !important',
    cursor: 'pointer',
});

export const tableWrapper = style({
    margin: '0',
    width: '99%',
});

export const tableAndMenuContainer = style({
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

export const buttonsCell = style({
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
});

globalStyle(`${tableWrapper} > ${tableContainer}`, {
    overflow: 'visible',
});
