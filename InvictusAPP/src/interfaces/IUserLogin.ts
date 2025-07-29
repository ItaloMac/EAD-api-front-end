export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserLoginResponse {
    token: {
        userId: string;
        token: string;
        expiration: string;
        userType: number;
    };
}

export interface IUserDetails {
    id: string;
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    userType: number;
    birthDate?: string | null;
    profilePhoto?: string | null;
    vindiCustomerId?: string | null;
}
