import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import * as styles from './CropPhoto.css.ts';

interface CropStepProps {
    image: string | null;
}

export const CropPhoto = forwardRef(({ image }: CropStepProps, ref) => {
    const [crop, setCrop] = useState<Crop>({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        unit: 'px',
    });
    const imageRef = useRef<HTMLImageElement | null>(null);

    const getCroppedImage = () => {
        if (imageRef.current && crop.width && crop.height) {
            const pixelCrop: PixelCrop = {
                x: crop.x,
                y: crop.y,
                width: crop.width,
                height: crop.height,
                unit: 'px',
            };
            return getCroppedImg(imageRef.current, pixelCrop);
        }
        return null;
    };

    useImperativeHandle(ref, () => ({
        getCroppedImage,
    }));

    const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const size = Math.min(crop.width, crop.height);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        const centerX = crop.x + crop.width / 2;
        const centerY = crop.y + crop.height / 2;

        ctx.drawImage(
            image,
            (centerX - size / 2) * scaleX,
            (centerY - size / 2) * scaleY,
            size * scaleX,
            size * scaleY,
            0,
            0,
            size,
            size,
        );

        return canvas.toDataURL('image/jpeg');
    };

    return (
        <div className={styles.cropContainer}>
            {image && (
                <ReactCrop crop={crop} onChange={setCrop} aspect={1}>
                    <img src={image} alt="Selected" ref={imageRef} />
                </ReactCrop>
            )}
        </div>
    );
});
