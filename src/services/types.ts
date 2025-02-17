export interface ApiResponse<T = void> {
    success: boolean;
    data?: T;
    message?: string;
}

interface ValidationError {
    message: string;
    errors: {
        message: string;
        field: string;
    }[];
}

export interface ErrorResponse {
    message: string;
    error?: string;
    statusCode: number;
}

interface SuccessResponse {
    message: string;
}

export type ChangePasswordApiResponse = ValidationError | ErrorResponse | SuccessResponse;

export type PasswordResetApiRequestResponse = ValidationError | ErrorResponse | null;

export type PasswordApiResetResponse = ValidationError | ErrorResponse | null;
