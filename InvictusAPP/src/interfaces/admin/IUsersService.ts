export interface IGetAllUsersService {
    id: string;
    name: string;
    lastName: string;
    email: string;
}

export interface IGetUserByIdService {
    id: string;
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    birthDate: string;
    profilePhoto: string;
    userType: number;
    vindiCustomerId: string;
}

export interface IUpdateUserService {
    id: string;
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    birthDate: string;
    profilePhoto: string;
    userType: number;
    vindiCustomerId: string;
}