export interface IUserRegistrationModel {
    email: string | null;
    password: string | null;
    fullName: string | null;
}
export interface ResponseRegistration {
    succeeded: boolean;
    errors: ErrorResponseRegistration[];
}
export interface ErrorResponseRegistration {
    code: string | null,
    description: string | null
}

export interface ILoginModel {
    email: string | null;
    password: string | null;
}