import { useCallback, RefObject, MouseEvent } from 'react';

export const useOnDialogBackdropClick = (
    modalRef: RefObject<HTMLDialogElement>,
    onClose: () => void,
) => {
    return useCallback(
        (event: MouseEvent<HTMLDialogElement>) => {
            if (event.target === modalRef.current) {
                onClose();
            }
        },
        [onClose, modalRef],
    );
};
