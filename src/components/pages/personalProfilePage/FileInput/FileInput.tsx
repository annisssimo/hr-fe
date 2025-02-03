import React, { useRef, useState } from 'react';
import * as styles from './FileInput.css.ts';
import { Button } from '../../../common/ButtonComponent/ButtonComponent.tsx';

interface FileInputProps {
    onImageSelect: (image: string | null) => void;
}

export const FileInput = ({ onImageSelect }: FileInputProps) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target?.result as string;
                setSelectedImage(image);
                onImageSelect(image);
            };
            reader.readAsDataURL(file);
        }
    };

    const onChooseImage = () => {
        fileRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <input
                type="file"
                ref={fileRef}
                accept="image/*"
                className={styles.fileInput}
                onChange={onUploadChange}
            />
            <Button type="preferred" buttonText="UPLOAD" onClick={onChooseImage} />
            {selectedImage && (
                <div className={styles.imagePreview}>
                    <img src={selectedImage} alt="Selected" className={styles.image} />
                </div>
            )}
        </div>
    );
};
