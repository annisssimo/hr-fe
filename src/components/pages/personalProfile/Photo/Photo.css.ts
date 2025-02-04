import { globalStyle, style } from '@vanilla-extract/css';
import { modal } from '../../../common/Modal/Modal.css.ts';

export const container = style({
    width: '100%',
});

globalStyle(`${container} > ${modal}`, {
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '60%',
});
