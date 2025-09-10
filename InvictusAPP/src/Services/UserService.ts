import { Api } from "../providers/Api";

export const UserService = {
  async getUserByIdAsync(id: IGetUserByIdService): Promise<IGetUserByIdService> {
    const response = await Api.post("api/Auth/login", loginData);
    return response.data;
  },
};