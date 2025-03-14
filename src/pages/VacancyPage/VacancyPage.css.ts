import { style } from '@vanilla-extract/css';

export const vacancy = style({
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    justifyContent: 'center',
});

export const vacancyText = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const actions = style({
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

export const editForm = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 40px 40px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '580px',
    margin: '20px auto',
});
