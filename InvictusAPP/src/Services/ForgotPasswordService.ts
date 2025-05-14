import {Api} from '../providers/Api';
import { IForgotPassword } from '../interfaces/IForgotPassword';

export const ForgotPasswordService = {
    async postForgotPassword(email: IForgotPassword): Promise<IForgotPassword> {
        const forgotPassword = await Api.post<IForgotPassword>("/api/ForgotPassword/forgot-password", email);
        return forgotPassword.data;
    }
};