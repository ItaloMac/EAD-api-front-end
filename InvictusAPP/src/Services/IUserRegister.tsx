import {Api} from '../providers/Api';
import { IUserRegister } from '../interfaces/IUserRegister';

export const UserRegisterService = {
    async postRegisterUser(userData: IUserRegister): Promise<IUserRegister> {
        const createUser = await Api.post<IUserRegister>("api/User", userData);
        return createUser.data;
    }
};