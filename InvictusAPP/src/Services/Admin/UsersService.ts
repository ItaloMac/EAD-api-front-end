import {Api} from '../../providers/Api';
import { IGetAllUsersService } from '../../interfaces/admin/IUsersService';

export const UsersService = {
    async getAllUsers(): Promise<IGetAllUsersService[]> {
        try{
            const response = await Api.get<IGetAllUsersService[]>("api/admin/usuarios");
            return response.data;
        } catch {
            console.error("Erro ao buscar usuarios:", Error);
      throw Error;
        }
    }
}