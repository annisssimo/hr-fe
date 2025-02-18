export const ERROR_MESSAGES = {
    SERVER_ERROR: 'Something went wrong. Please try again later.',
};

export const SUCCESS_MESSAGES = {
    PASSWORD_CHANGED: 'Your password has been successfully changed',
    PROFILE_UPDATED: 'Your personal info has been updated',
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
