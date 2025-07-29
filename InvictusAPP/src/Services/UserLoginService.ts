import { Api } from "../providers/Api";
import { IUserLoginRequest, IUserLoginResponse } from "../interfaces/IUserLogin";

export const UserLoginService = {
  async postUserLoginAsync(loginData: IUserLoginRequest): Promise<IUserLoginResponse> {
    const response = await Api.post("api/Auth/login", loginData);
    return response.data;
  },
};