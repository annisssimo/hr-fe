import { useState, useRef } from 'react';
import { FileInput } from '../FileInput/FileInput.tsx';
import { Modal } from '../../../common/Modal/Modal.tsx';
import { Typography } from '../../../common/Typography/Typography.tsx';
import { CropPhoto } from '../CropPhoto/CropPhoto.tsx';
import { TakePhoto } from '../TakePhoto/TakePhoto.tsx';
import * as styles from './Photo.css.ts';

export const Photo = () => {
    const [isChooseModalOpen, setIsChooseModalOpen] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [isTakePhotoModalOpen, setIsTakePhotoModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const cropPhotoRef = useRef<{ getCroppedImage: () => string | null }>(null);
    const [error, setError] = useState('');
    const [errorCallback, setErrorCallback] = useState<() => void>(() => console.log(error));
    const handleCloseChooseModal = () => setIsChooseModalOpen(false);
    const handleCloseUploadModal = () => setIsUploadModalOpen(false);
    const handleCloseCropModal = () => setIsCropModalOpen(false);
    const handleCloseTakePhotoModal = () => setIsTakePhotoModalOpen(false);

    const handleOpenCrop = () => setIsCropModalOpen(true);

    const handleChooseUpload = () => {
        setIsChooseModalOpen(false);
        setIsUploadModalOpen(true);
    };

    const handleChooseTakePhoto = () => {
        setIsChooseModalOpen(false);
        setIsTakePhotoModalOpen(true);
    };

    const handleUploadDone = (image: string | null) => {
        if (image) {
            setSelectedImage(image);
            setIsUploadModalOpen(false);
            setIsCropModalOpen(true);
        } else {
            setError('Select image to upload before continuing');
            setErrorCallback(() => handleChooseUpload);
        }
    };

    const handleCropComplete = () => {
        const croppedImage = cropPhotoRef.current?.getCroppedImage();
        if (croppedImage) {
            setSelectedImage(croppedImage);
            setIsCropModalOpen(false);
        } else {
            setError('Cropping error, please try cropping it again');
            setErrorCallback(() => handleOpenCrop);
        }
    };

    const handleCropBack = () => {
        setIsCropModalOpen(false);
        setIsUploadModalOpen(true);
    };

    const handlePhotoTaken = (photo: string) => {
        setSelectedImage(photo);
    };

    const confirmPhotoTaken = (photo: string | null) => {
        if (photo) {
            setIsTakePhotoModalOpen(false);
            setIsCropModalOpen(true);
        } else {
            setError('Please take photo before continuing');
            setErrorCallback(() => handleChooseTakePhoto);
        }
    };

    const cancelPhotoTaken = () => {
        setIsTakePhotoModalOpen(false);
        setIsChooseModalOpen(true);
    };

    const closeErrorModal = () => {
        setError('');
    };

    const modalErrorConfirm = () => {
        setError('');
        errorCallback();
    };

    return (
        <div className={styles.container}>
            <Modal
                isOpen={error != ''}
                onlyConfirm={true}
                onCancel={closeErrorModal}
                confirmText={'OK'}
                onConfirm={() => modalErrorConfirm()}
            >
                <Typography variant={'h4'}>{error}</Typography>
            </Modal>
            <Modal
                isOpen={isChooseModalOpen}
                onClose={handleCloseChooseModal}
                onConfirm={handleChooseUpload}
                onCancel={handleChooseTakePhoto}
                confirmText="UPLOAD PHOTO"
                cancelText="TAKE PHOTO"
            >
                <Typography variant="paragraph">Choose an option</Typography>
            </Modal>

            <Modal
                isOpen={isUploadModalOpen}
                onClose={handleCloseUploadModal}
                onConfirm={() => handleUploadDone(selectedImage)}
                onCancel={() => {
                    setIsUploadModalOpen(false);
                    setIsChooseModalOpen(true);
                }}
                confirmText="DONE"
                cancelText="BACK"
            >
                <FileInput onImageSelect={setSelectedImage} />
            </Modal>

            <Modal
                isOpen={isTakePhotoModalOpen}
                onClose={handleCloseTakePhotoModal}
                onConfirm={() => {
                    confirmPhotoTaken(selectedImage);
                }}
                onCancel={() => {
                    cancelPhotoTaken();
                }}
                confirmText="DONE"
                cancelText="BACK"
            >
                <TakePhoto onPhotoTaken={handlePhotoTaken} />
            </Modal>

            <Modal
                isOpen={isCropModalOpen}
                onClose={handleCloseCropModal}
                onConfirm={handleCropComplete}
                onCancel={handleCropBack}
                confirmText="CROP"
                cancelText="BACK"
            >
                {selectedImage && <CropPhoto ref={cropPhotoRef} image={selectedImage} />}
            </Modal>
        </div>
    );
};
