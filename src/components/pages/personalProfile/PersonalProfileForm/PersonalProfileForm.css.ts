import { style } from '@vanilla-extract/css';

export const profileMain = style({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const avatarContainer = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
});

export const avatarImage = style({
    width: '140px',
    height: '140px',
    borderRadius: '50%',
});

export const personalProfilePageForm = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    width: '540px',
    paddingRight: '160px',
});

export const buttonsContainer = style({
    display: 'flex',
    gap: '16px',
    paddingLeft: '170px',
});

export const buttonWrapper = style({
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    margin: '0px 0px 10px',
    gap: '10px',
});
