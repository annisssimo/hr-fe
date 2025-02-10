import { toast } from 'react-toastify';

export const showErrorMessage = (message: string) => {
    return toast.error(message, {
        autoClose: 3000,
        position: 'bottom-left',
        hideProgressBar: true,
        closeButton: false,
        theme: 'colored',
    });
};

export const showSuccessMessage = (message: string) => {
    return toast.success(message, {
        autoClose: 3000,
        position: 'bottom-left',
        hideProgressBar: true,
        closeButton: false,
        theme: 'colored',
    });
};
