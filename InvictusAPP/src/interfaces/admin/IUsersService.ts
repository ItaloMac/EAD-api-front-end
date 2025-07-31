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

export interface IUsersRegistrationService {
    id: string; 
    registrationStatus: string; 
    registrationDate: string; 
    cancellationDate?: string; 
    class: {
        id: string; 
        name: string; 
        curso: {
            id: string;
            name: string; 
        };
    };
}