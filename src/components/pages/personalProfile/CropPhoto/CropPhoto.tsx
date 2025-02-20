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
    const [zoom, setZoom] = useState(1);

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

        const displayedWidth = image.offsetWidth;
        const displayedHeight = image.offsetHeight;
        const scaleX = image.naturalWidth / displayedWidth;
        const scaleY = image.naturalHeight / displayedHeight;

        const offsetX = (displayedWidth * (zoom - 1)) / 2;
        const offsetY = (displayedHeight * (zoom - 1)) / 2;

        const effectiveCrop = {
            x: (crop.x + offsetX) / zoom,
            y: (crop.y + offsetY) / zoom,
            width: crop.width / zoom,
            height: crop.height / zoom,
            unit: crop.unit,
        };

        const size = Math.min(effectiveCrop.width, effectiveCrop.height);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        const centerX = effectiveCrop.x + effectiveCrop.width / 2;
        const centerY = effectiveCrop.y + effectiveCrop.height / 2;

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
                <>
                    <ReactCrop crop={crop} onChange={setCrop} aspect={1}>
                        <img
                            src={image}
                            alt="Selected"
                            ref={imageRef}
                            style={{
                                transform: `scale(${zoom})`,
                                transformOrigin: 'center center',
                            }}
                        />
                    </ReactCrop>
                    <div className={styles.zoomContainer}>
                        <label htmlFor="zoomRange">Zoom: </label>
                        <input
                            id="zoomRange"
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />
                    </div>
                </>
            )}
        </div>
    );
});
