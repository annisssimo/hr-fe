import { style } from '@vanilla-extract/css';

export const fullScreenContainer = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
});
