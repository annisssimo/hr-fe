import heroImage from '../../../../assets/images/heroImage.png';
import * as style from './HeroImage.css';

export function HeroImage() {
    return (
        <>
            <div className={style.heroImageWrapper}>
                <span className={style.welcomeText}>SUNMAIT HR SYSTEM</span>
                <div className={style.heroImageContainer}>
                    <img className={style.heroImage} src={heroImage} alt="hero-image" />
                </div>
            </div>
        </>
    );
}
