import { style, globalStyle } from '@vanilla-extract/css';
import { tableContainer } from '../../components/common/Table/TableStyle.css.ts';

export const pageWrapper = style({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

export const contentWrapper = style({
    width: '80%',
    flex: 1,
    margin: '20px auto',
});

globalStyle(`${contentWrapper} ${tableContainer}`, {
    overflow: 'visible',
});
