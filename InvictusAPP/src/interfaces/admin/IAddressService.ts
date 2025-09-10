export interface IGetAddressByIdService {
    id: string;
    cep: string;
    road: string;
    neighborhood: string;
    city: string;
    state: string;
    number?: number
}

export interface ICreateAddressService {
    cep: string;
    road: string;
    neighborhood: string;
    city: string;
    state: string;
    number?: number;
}

export interface IUpdateAddressService {
    id: string;
    cep?: string;
    road?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    number?: number;
}

export interface IAddressResponse {
    id: string;
    cep: string;
    road: string;
    neighborhood: string;
    city: string;
    state: string;
    number?: number;
}