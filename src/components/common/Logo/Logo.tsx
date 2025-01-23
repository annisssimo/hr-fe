import { ReactComponent as SunmaitLogo } from '../../../assets/SunmaitLogo.svg';

export const Logo = ({ width, height }: LogoProps) => {
    return <SunmaitLogo width={width} height={height} />;
};

interface LogoProps {
    width: string;
    height: string;
}
