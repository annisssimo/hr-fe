export const ERROR_MESSAGES = {
    SERVER_ERROR: 'Something went wrong. Please try again later.',
    TOKEN_INVALID: 'Your link is expired. Please sent a new request to password reset.',
    INVALID_PASSWORD: 'Invalid old password',
    EMAIL_TAKEN: 'Email Already In Use',
};

export const SUCCESS_MESSAGES = {
    PASSWORD_CHANGED: 'Your password has been successfully changed',
    PROFILE_UPDATED: 'Your personal info has been updated',
    REGISTERED:
        'Your request is taken into consideration. Please, wait for information on your email address',
};

export enum USER_STATUS {
    ACTIVE = 'active',
    PENDING = 'pending',
    ARCHIVED = 'archived',
}

export enum USER_ROLE {
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
    MANAGER = 'manager',
}

export enum INCLUDE_OPTIONS {
    MANAGER = 'manager',
}
