import { ReactComponent as SunmaitLogoBlack } from '../../../assets/logo/sunmait-black.svg';
import { ReactComponent as SunmaitLogoWhite } from '../../../assets/logo/sunmait-white.svg';

export const Logo = ({ width, height, color = 'black' }: LogoProps) => {
    return color === 'black' ? (
        <SunmaitLogoBlack width={width} height={height} />
    ) : (
        <SunmaitLogoWhite width={width} height={height} />
    );
};

interface LogoProps {
    width: string;
    height: string;
    color?: 'white' | 'black';
}
