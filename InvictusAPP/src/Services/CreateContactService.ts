import { Api } from '../providers/Api';
import { ICreateContactService } from '../interfaces/ICreateContactService';

export const CreateService = {
    async postContact(contactData: ICreateContactService): Promise<ICreateContactService> {
        try {
            const response = await Api.post<ICreateContactService>("api/Contact", contactData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar o contato:", error);
            throw new Error("Erro ao criar o contato. Por favor, tente novamente.");
        }
    },
};