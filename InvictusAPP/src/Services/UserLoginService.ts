import {Api} from '../providers/Api';
import { IUserLogin } from '../interfaces/IUserLogin';

export const UserLoginService = {
    async postUserLoginAsync(loginData: IUserLogin): Promise<IUserLogin> {
        const loginRequest = await Api.post<IUserLogin>("api/User", loginData);
        return loginRequest.data;
    }
};