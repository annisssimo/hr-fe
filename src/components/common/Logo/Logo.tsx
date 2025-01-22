import logo from '../../../assets/SunmaitLogo.svg';

export const Logo = ({ width, height }: LogoProps) => {
    return <img src={logo} alt="Sunmait Logo" width={width} height={height} />;
};

interface LogoProps {
    width: string;
    height: string;
}
