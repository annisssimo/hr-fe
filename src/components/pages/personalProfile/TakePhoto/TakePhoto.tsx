import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';
import * as styles from './TakePhoto.css.ts';

export const TakePhoto = ({ onPhotoTaken }: { onPhotoTaken?: (photo: string) => void }) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch((error) => console.error('Error playing video:', error));
        }
    }, [stream]);

    const startCamera = useCallback(async () => {
        try {
            const camera = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
            });
            setStream(camera);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    }, [stream]);

    const takePicture = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const photoData = canvas.toDataURL('image/png');
                setPhoto(photoData);
                stopCamera();
                onPhotoTaken?.(photoData);
            }
        }
    }, [stopCamera, onPhotoTaken]);

    const retakePicture = useCallback(async () => {
        setPhoto(null);
        await startCamera();
    }, [startCamera]);

    return (
        <div>
            {stream && (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: 'auto' }}
                />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {!photo && !stream && (
                <Button type={'preferred'} buttonText={'Start Camera'} onClick={startCamera} />
            )}
            {!photo && stream && (
                <Button type={'preferred'} buttonText={'Take Picture'} onClick={takePicture} />
            )}
            {photo && <img src={photo} alt="Captured" className={styles.resultingImage} />}
            {photo && (
                <Button type={'preferred'} buttonText={'Retake Picture'} onClick={retakePicture} />
            )}
        </div>
    );
};
