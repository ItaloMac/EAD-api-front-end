import {Api} from '../../providers/Api';
import { IGetAllRegistrationsService, IGetRegistrationByIdService, IUpdateRegistrationService, ICreateRegistrationService } from '../../interfaces/admin/IRegistrationService';

export const RegistrationService = {
    async createRegistration(data: ICreateRegistrationService): Promise<void> {
        try {
            await Api.post("api/admin/matriculas/create", data);
        } catch (error) {
            console.error("Erro ao criar matrícula:", error);
            throw error;
        }
    },
    async getAllRegistrations(): Promise<IGetAllRegistrationsService[]> {
        try{
            const response = await Api.get<IGetAllRegistrationsService[]>("api/admin/matriculas");
            return response.data;
        } catch {
            console.error("Erro ao buscar matriculas:", Error);
      throw Error;
        }
    },

    async getRegistrationById(id: string): Promise<IGetRegistrationByIdService> {
        try {
            const response = await Api.get<IGetRegistrationByIdService>(`api/admin/matricula/${id}`);
            return response.data;
        } catch {
            console.error("Erro ao buscar matrícula:", Error);
            throw Error;
        }
    },

    async updateRegistration(id: string, data: IUpdateRegistrationService): Promise<void> {
        try {
            await Api.put(`api/admin/matriculas/update/${id}`, data);
        } catch (error) {
            console.error("Erro ao atualizar matricula:", error);
            throw error;
        }
    },

    async deleteRegistration(id: string): Promise<void> {
        try {
            await Api.delete(`api/admin/matricula/delete/${id}`);
        } catch (error)
        {
            console.error("Erro ao deletar matrícula:", error);
            throw error;
        }
    }
}
