import {Api} from '../providers/Api'
import { ICursoService } from '../interfaces/ICursoService';

export const CursoService = {
    async getAllCursos(): Promise<ICursoService[]> {
        try{
            const response = await Api.get<ICursoService[]>("api/curso");
            return response.data;
        } catch {
            console.error("Erro ao buscar cursos:", Error);
      throw Error;
        }
    },

    async getCursoById(id: string): Promise<ICursoService> {
        try{
            const response = await Api.get<ICursoService>(`api/curso/${id}`);
            return response.data;
        } catch {
            console.error("Erro ao buscar cursos:", Error);
      throw Error;
        }
    }
}