import {Api} from '../../providers/Api';
import { IGetAllUsersService, IGetUserByIdService, IUpdateUserService, IUsersRegistrationService } from '../../interfaces/admin/IUsersService';

export const UsersService = {
    async getAllUsers(): Promise<IGetAllUsersService[]> {
        try{
            const response = await Api.get<IGetAllUsersService[]>("api/admin/usuarios");
            return response.data;
        } catch {
            console.error("Erro ao buscar usuarios:", Error);
      throw Error;
        }
    },

    async getUserById(id: string): Promise<IGetUserByIdService> {
        try {
            const response = await Api.get<IGetUserByIdService>(`api/admin/usuarios/${id}`);
            return response.data;
        } catch {
            console.error("Erro ao buscar usuario:", Error);
            throw Error;
        }
    },

    async updateUser(id: string, data: IUpdateUserService): Promise<void> {
        try {
            await Api.put(`api/admin/usuarios/update/${id}`, data);
        } catch (error) {
            console.error("Erro ao atualizar usuario:", error);
            throw error;
        }
    },

    async getRegistrationByUserId(userId:string): Promise<IUsersRegistrationService[]> {
        try {
            const response = await Api.get<IUsersRegistrationService[]>(`api/admin/usuarios/${userId}/matriculas`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao buscar matriculas do usuario:", error);
            throw error;
        }
    },

    async deleteUser(id: string): Promise<void> {
        try {
            await Api.delete(`api/admin/usuarios/delete/${id}`);
        } catch (error)
        {
            console.error("Erro ao deletar usuario:", error);
            throw error;
        }
    }
}
