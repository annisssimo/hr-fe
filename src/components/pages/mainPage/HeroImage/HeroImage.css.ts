import { globalStyle, style } from '@vanilla-extract/css';

export const welcomeText = style({
    transition: 'ease 0.5s',
    opacity: '0',
    marginLeft: '50px',
    zIndex: '3',
    fontSize: '60px',
    fontWeight: '600',
    top: '350px',
    color: 'white',
    position: 'absolute',
    textTransform: 'uppercase',
});

export const heroImageWrapper = style({
    marginTop: '20px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
   
});

globalStyle(`${heroImageWrapper}:hover ${welcomeText}`, {
    opacity: '1'
})

export const heroImage = style({
    width: '100%',
    objectFit: 'cover',
    transition: ' 0.5s ease',
    transform: 'scale(1.2)',
    filter: 'brightness(1)',
});

globalStyle(`${heroImageWrapper}:hover ${heroImage}`, {
    transform: 'scale(1)',
    filter: 'brightness(0.8)',
})

export const heroImageContainer = style({
    display: 'flex',
    height: '600px',
    overflow: 'hidden',
    position: 'relative',
});
