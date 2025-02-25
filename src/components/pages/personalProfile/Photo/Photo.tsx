import { useState, useRef, useEffect, ReactNode } from 'react';
import { FileInput } from '../FileInput/FileInput.tsx';
import { Modal } from '../../../common/Modal/Modal.tsx';
import { Typography } from '../../../common/Typography/Typography.tsx';
import { CropPhoto } from '../CropPhoto/CropPhoto.tsx';
import { TakePhoto } from '../TakePhoto/TakePhoto.tsx';
import * as styles from './Photo.css.ts';
import { handleAxiosError } from '../../../../utils/handleAxiosError.ts';
import { showSuccessMessage } from '../../../../utils/UI/toastMessages.ts';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../../redux/userSlice/userSlice.ts';
import { useUpdateUserMutation } from '../../../../services/users.api.ts';
import { SUCCESS_MESSAGES } from '../../../../constants';

interface PhotoProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalStep = 'choose' | 'upload' | 'take' | 'crop';

export const Photo = ({ isOpen, onClose }: PhotoProps) => {
    const [updateUser] = useUpdateUserMutation();
    const [modalStep, setModalStep] = useState<ModalStep>('choose');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const cropPhotoRef = useRef<{ getCroppedImage: () => string | null }>(null);
    const [error, setError] = useState('');
    const [errorCallback, setErrorCallback] = useState<() => void>(() => {});
    const user = useSelector(getUserSelector);

    useEffect(() => {
        if (isOpen) {
            setModalStep('choose');
            setSelectedImage(null);
            setError('');
            setErrorCallback(() => {});
        }
    }, [isOpen]);

    const handleChooseUpload = () => {
        setModalStep('upload');
    };

    const handleChooseTakePhoto = () => {
        setModalStep('take');
    };

    const handleUploadDone = () => {
        if (selectedImage) {
            setModalStep('crop');
        } else {
            setError('Select image to upload before continuing');
            setErrorCallback(() => () => setModalStep('upload'));
        }
    };

    const handleCropComplete = async () => {
        const croppedImage = cropPhotoRef.current?.getCroppedImage();
        if (croppedImage) {
            setSelectedImage(croppedImage);
            try {
                onClose();
                await updateUser({
                    userId: user?.id || '',
                    body: {
                        avatar: croppedImage,
                    },
                }).unwrap();
                showSuccessMessage(SUCCESS_MESSAGES.PROFILE_UPDATED);
            } catch (error) {
                handleAxiosError(error);
                onClose();
            }
        } else {
            setError('Cropping error, please try cropping it again');
            setErrorCallback(() => () => setModalStep('crop'));
        }
    };

    const handleCropBack = () => {
        setModalStep('upload');
    };

    const handlePhotoTaken = (photo: string) => {
        setSelectedImage(photo);
    };

    const confirmPhotoTaken = () => {
        if (selectedImage) {
            setModalStep('crop');
        } else {
            setError('Please take photo before continuing');
            setErrorCallback(() => () => setModalStep('take'));
        }
    };

    const cancelPhotoTaken = () => {
        setModalStep('choose');
    };

    const closeErrorModal = () => {
        setError('');
        onClose();
    };

    const modalErrorConfirm = () => {
        setError('');
        errorCallback();
    };

    let modalContent: ReactNode = null;
    let onConfirm: (() => void) | undefined;
    let onCancel: (() => void) | undefined;
    let confirmText = '';
    let cancelText = '';
    const onlyConfirm = false;

    switch (modalStep) {
        case 'choose':
            modalContent = <Typography variant="paragraph">Choose an option</Typography>;
            onConfirm = handleChooseUpload;
            onCancel = handleChooseTakePhoto;
            confirmText = 'UPLOAD PHOTO';
            cancelText = 'TAKE PHOTO';
            break;
        case 'upload':
            modalContent = <FileInput onImageSelect={setSelectedImage} />;
            onConfirm = handleUploadDone;
            onCancel = () => setModalStep('choose');
            confirmText = 'DONE';
            cancelText = 'BACK';
            break;
        case 'take':
            modalContent = <TakePhoto onPhotoTaken={handlePhotoTaken} />;
            onConfirm = confirmPhotoTaken;
            onCancel = cancelPhotoTaken;
            confirmText = 'DONE';
            cancelText = 'BACK';
            break;
        case 'crop':
            modalContent = selectedImage && <CropPhoto ref={cropPhotoRef} image={selectedImage} />;
            onConfirm = handleCropComplete;
            onCancel = handleCropBack;
            confirmText = 'CROP';
            cancelText = 'BACK';
            break;
    }

    return (
        <div className={styles.container}>
            {error !== '' && (
                <Modal
                    isOpen={true}
                    onlyConfirm={true}
                    onConfirm={modalErrorConfirm}
                    onCancel={closeErrorModal}
                    confirmText="OK"
                    isClosingOnButtonClick={true}
                >
                    <Typography variant="h4">{error}</Typography>
                </Modal>
            )}

            <Modal
                isOpen={isOpen && error === ''}
                onClose={onClose}
                onConfirm={onConfirm}
                onCancel={onCancel}
                confirmText={confirmText}
                cancelText={cancelText}
                isClosingOnButtonClick={false}
                onlyConfirm={onlyConfirm}
            >
                {modalContent}
            </Modal>
        </div>
    );
};
