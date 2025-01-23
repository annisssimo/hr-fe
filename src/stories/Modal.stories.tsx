import { useState } from 'react';

import { Button } from '../components/common/ButtonComponent/ButtonComponent';
import { Modal } from '../components/common/Modal/Modal';
import '../App.css';

export default {
    title: 'Components/Modal',
    component: Modal,
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const handleConfirm = () => {
        alert('Confirmed');
        setIsOpen(false);
    };

    const handleCancel = () => {
        alert('Cancelled');
        setIsOpen(false);
    };

    return (
        <>
            <Button type="preferred" buttonText="Open Modal" onClick={() => setIsOpen(true)} />
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                confirmText="Confirm"
                cancelText="Cancel"
            >
                <p>This is the modal content!</p>
            </Modal>
        </>
    );
};

export const OnlyConfirm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const handleConfirm = () => {
        alert('Confirmed');
        setIsOpen(false);
    };

    return (
        <>
            <Button type="preferred" buttonText="Open Modal" onClick={() => setIsOpen(true)} />
            <Modal
                isOpen={isOpen}
                onConfirm={handleConfirm}
                onlyConfirm={true}
                confirmText="OK"
                onClose={handleClose}
            >
                <p>This is a modal with only a confirm button!</p>
            </Modal>
        </>
    );
};
