import { Api } from '../../providers/Api';
import { ICreateTeacherService, IGetAllTeachersService, IGetModulesByIdTeacherService, IGetTeacherByIdService, IGetTeachersListService, IUpdateTeacherByIdService } from '../../interfaces/admin/ITeachersSerivce';

export const TeachersService = {
    async getTeacherListService(): Promise<IGetTeachersListService[]> {
        try {
            const response = await Api.get<IGetTeachersListService[]>("api/admin/professores");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            throw error;
        }
    },

    async createTeacherService(teacher: ICreateTeacherService): Promise<ICreateTeacherService> {
        try {
            const response = await Api.post<ICreateTeacherService>("api/admin/professores/create", teacher);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar professor:", error);
            throw error;
        }
    },

    async deleteTeacherService(id: string): Promise<void> {
        try {
            await Api.delete(`api/admin/professores/delete/${id}`);
        } catch (error) {
            console.error("Erro ao deletar professor:", error);
            throw error;
        }
    },

    async getTeacherByIdService(id: string): Promise<IGetTeacherByIdService> {
        try {
            const response = await Api.get<IGetTeacherByIdService>(`api/admin/professores/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar professor por ID:", error);
            throw error;
        }
    },

    async getAllTeachersService(): Promise<IGetAllTeachersService[]> {
        try {
            const response = await Api.get<IGetAllTeachersService[]>("api/admin/professores");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar todos os professores:", error);
            throw error;
        }
    },

    async updateTeacherByIdService(id: string, teacherData: IUpdateTeacherByIdService): Promise<IUpdateTeacherByIdService> {
        try {
            const response = await Api.put<ICreateTeacherService>(`api/admin/professores/update/${id}`, teacherData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar professor:", error);
            throw error;
        }
    },

    async getModulesByIdTeacherService(id: string): Promise<IGetModulesByIdTeacherService[]> {
        try {
            const response = await Api.get<IGetModulesByIdTeacherService[]>(`api/admin/professores/${id}/modulos`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar módulos por ID do professor:", error);
            throw error;
        }
    }
}
