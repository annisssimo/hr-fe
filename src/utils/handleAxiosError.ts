import axios from 'axios';
import { showErrorMessage } from './UI/toastMessages';
import { ERROR_MESSAGES } from '../constants';

export const handleAxiosError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            showErrorMessage('Network error or server is unreachable. Please try again later.');
        } else {
            switch (error.response.status) {
                case 400:
                    showErrorMessage('Bad data provided, please try again later.');
                    break;
                case 401:
                    showErrorMessage('Unauthorised');
                    break;
                case 500:
                    showErrorMessage('Server Error, try again later');
                    break;
                default:
                    showErrorMessage(ERROR_MESSAGES.SERVER_ERROR);
                    break;
            }
        }
    } else {
        console.error('Unexpected error: ', error);
        showErrorMessage('Unexpected error happened');
    }
};
