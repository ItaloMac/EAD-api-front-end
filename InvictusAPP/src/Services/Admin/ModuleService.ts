import { Api } from '../../providers/Api';
import { ICreateModuleService, IGetAllModulesService, IGetModuleByIdService, IUpdateModuleService } from '../../interfaces/admin/IModulesService';

export const ModuleService = {
    async getAllModules(): Promise<IGetAllModulesService[]> {
        try {
            const response = await Api.get<IGetAllModulesService[]>(`api/admin/modulos`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar módulos:", error);
            throw error;
        }
    },

    async getModuleById(id: string): Promise<IGetModuleByIdService> {
        try {
            const response = await Api.get<IGetModuleByIdService>(`api/admin/modulos/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar módulo por ID:", error);
            throw error;
        }
    },

    async updateModule(module: IUpdateModuleService): Promise<IUpdateModuleService> {
        try {
            const response = await Api.put<IUpdateModuleService>(`api/admin/modulos/${module.id}/update`, module);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar módulo:", error);
            throw error;
        }
    },

    async createModule(module: ICreateModuleService): Promise<ICreateModuleService> {
        try {
            const response = await Api.post<ICreateModuleService>(`api/admin/modulos/create`, module  );
            return response.data;
        } catch (error) {
            console.error("Erro ao criar módulo:", error);
            throw error;
        }
    },

    async deleteModule(id: string): Promise<void> {
        try {
            await Api.delete(`api/admin/modulos/${id}/delete`);
        } catch (error) {
            console.error("Erro ao deletar módulo:", error);
            throw error;
        }
    }
};