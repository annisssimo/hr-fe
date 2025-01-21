import { ReactNode, KeyboardEvent } from 'react';
import * as styles from './Modal.css';
import { Button } from '../ButtonComponent/ButtonComponent';
import { useOnDialogBackdropClick } from '../../../hooks/useOnDialogBackdropClick';
import { useModal } from '../../../hooks/useModal';

export const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    onCancel,
    children,
    onlyConfirm = false,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}: ModalProps) => {
    const modalRef = useModal(isOpen);

    const handleCloseModal = () => {
        onClose?.();
    };

    const handleCancelClick = () => {
        onCancel?.();
        handleCloseModal();
    };

    const handleConfirmClick = () => {
        onConfirm?.();
        handleCloseModal();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    const handleBackdropClick = useOnDialogBackdropClick(modalRef, handleCloseModal);

    return (
        <dialog
            ref={modalRef}
            onKeyDown={handleKeyDown}
            onClick={handleBackdropClick}
            className={styles.modal}
        >
            <form method="dialog" className={styles.formInsideDialog}>
                {children}

                <div className={styles.controlButtonsContainer}>
                    {!onlyConfirm && (
                        <Button
                            type="secondary"
                            buttonText={cancelText}
                            onClick={handleCancelClick}
                        />
                    )}
                    <Button
                        type="preferred"
                        buttonText={confirmText}
                        onClick={handleConfirmClick}
                    />
                </div>
            </form>
        </dialog>
    );
};

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onlyConfirm?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}
