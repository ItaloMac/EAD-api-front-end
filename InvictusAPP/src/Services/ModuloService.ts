import { IModuloService } from "../interfaces/IModuloService";
import { Api } from "../providers/Api";

export const ModuloService = {
    async getModulosByIdCurso(id: string): Promise<IModuloService[]> {
        try {
            const response = await Api.get<IModuloService[]>(`api/modulo/${id}/modulos`);
            return response.data;
        } catch{
            console.error("Erro ao buscar professores do curso:", Error);
        }
        throw Error;
    }
}