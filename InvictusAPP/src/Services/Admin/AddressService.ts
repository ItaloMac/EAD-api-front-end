import { Api } from '../../providers/Api';
import {
    IAddressResponse,
    ICreateAddressService,
    IGetAddressByIdService,
    IUpdateAddressService,
} from '../../interfaces/admin/IAddressService';

export const AddressService = {
    async getAddressById(id: string): Promise<IGetAddressByIdService> {
        try {
            const response = await Api.get<IGetAddressByIdService>(`api/address/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            throw error;
        }
    },

    async createAddress(data: ICreateAddressService): Promise<IAddressResponse> {
        const response = await Api.post("api/address", data);
        return response.data;
    },

    async updateAddress(addressData: IUpdateAddressService): Promise<IUpdateAddressService> {
        try {
            const response = await Api.put<IUpdateAddressService>(`api/address/${addressData.id}`, addressData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            throw error;
        }
    },
}