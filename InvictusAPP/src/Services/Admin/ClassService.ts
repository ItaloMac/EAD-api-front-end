import { Api } from '../../providers/Api';
import { 
    IGetAllClassesService,
    ICreateClassService,
    IGetClassByIdService,
    IUpdateClassService,
} from '../../interfaces/admin/IClassService';

export const ClassService = {
    async getAllClasses(): Promise<IGetAllClassesService[]> {
        try {
            const response = await Api.get<IGetAllClassesService[]>("api/admin/turmas");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
            throw error;
        }
    },

    async createClass(classData: ICreateClassService): Promise<ICreateClassService> {
        try {
            const response = await Api.post<ICreateClassService>("api/admin/turmas/create", classData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar turma:", error);
            throw error;
        }
    },

    async getClassById(id: string): Promise<IGetClassByIdService> {
        try {
            const response = await Api.get<IGetClassByIdService>(`api/admin/turmas/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar turma:", error);
            throw error;
        }
    },

    async updateClass(classData: IUpdateClassService): Promise<IUpdateClassService> {
        try {
            const response = await Api.put<IUpdateClassService>(`api/admin/turmas/${classData.id}/update`, classData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar turma:", error);
            throw error;
        }
    },

    async deleteClass(id: string): Promise<void> {
        try {
            await Api.delete(`api/admin/turmas/${id}/delete`);
        } catch (error) {
            console.error("Erro ao deletar turma:", error);
            throw error;
        }
    }
}