export interface IUserRegistrationModel {
    email: string;
    password: string;
    fullName: string;
}

export interface ILoginModel {
    email: string | null;
    password: string | null;
}