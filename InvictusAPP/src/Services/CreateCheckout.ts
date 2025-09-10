import { ICheckoutResponse } from '../interfaces/ICheckoutResponse';
import { Api } from '../providers/Api';

export const CreateCheckout = {
    async postCheckout(cursoId: string) : Promise<ICheckoutResponse> {
        try {
            const response = await Api.post<ICheckoutResponse>(`/api/FinalizarCompra/comprar-curso/${cursoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar o contato:", error);
            throw new Error("Erro ao criar o contato. Por favor, tente novamente.");
        }
    },
};