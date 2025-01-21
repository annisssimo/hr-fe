import { useEffect, useRef } from 'react';

export const useModal = (isOpen: boolean) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (!modalElement) return;

        if (isOpen && !modalElement.hasAttribute('open')) {
            modalElement.showModal();
        } else if (!isOpen) {
            modalElement.close();
        }
    }, [isOpen]);

    return modalRef;
};
