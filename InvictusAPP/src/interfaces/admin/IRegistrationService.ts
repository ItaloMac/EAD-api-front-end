export interface IGetAllRegistrationsService {
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
    }
    user: {
        id: string; 
        name: string; 
        lastName: string; 
        cpf: string;
        phoneNumver: string;
    };
    vindiPlanId: string;
}

export interface ICreateRegistrationService {
    registrationStatus: string; 
    registrationDate: string; 
    cancellationDate?: string; 
    class: {
        id: string; 
        name: string; 
    }
    user: {
        id: string; 
        name: string; 
    };
    vindiPlanId: string;
}

export interface IGetRegistrationByIdService {
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
    }
    user: {
        id: string; 
        name: string; 
        lastName: string; 
        cpf: string;
        phoneNumver: string;
        profilePhoto?: string; 
    };
    vindiPlanId: string;
}

export interface IUpdateRegistrationService {
    registrationStatus: string; 
    registrationDate: string; 
    cancellationDate?: string; 
    class: {
        id: string; 
        name: string; 
    }
    user: {
        id: string; 
        name: string; 
    };
    vindiPlanId: string;
}
