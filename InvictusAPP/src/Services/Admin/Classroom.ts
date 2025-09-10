import {Api} from "../../providers/Api";
import {IClassroomresponse, ICreateClassroomService, IUpdateClassroomService} from "../../interfaces/admin/IClassroom";

export const ClassroomService = {


    async getAllClassrooms(): Promise<IClassroomresponse[]> {
        try{
            const response = await Api.get<IClassroomresponse[]>("api/admin/aulas");
            return response.data;
        }
        catch(error){
            console.error("Erro ao buscar classrooms:", error);
            throw error;
        }
    },
    
    async getClassroomByIdService(id:string): Promise<IClassroomresponse> {
        try{
            const response = await Api.get<IClassroomresponse>(`api/admin/aulas/${id}`);
            return response.data;
        }
        catch(error){
            console.error("Erro ao buscar classroom:", error);
            throw error;
        }
    },

    async createClassroomService(data: ICreateClassroomService): Promise<ICreateClassroomService> {
        try{
            const response = await Api.post("api/admin/aulas/create", data);
            return response.data;
        }
        catch(error){
            console.error("Erro ao criar classroom:", error);
            throw error;
        }       
    },

    async updateClassroomService(data: IUpdateClassroomService): Promise<IUpdateClassroomService> {
        try{
            const response = await Api.put<IUpdateClassroomService>(`api/admin/aulas/${data.id}/update`, data);
            return response.data;
        }
        catch(error){
            console.error("Erro ao atualizar classroom:", error);
            throw error;
        }
    },

    async deleteClassroomService(id: string): Promise<void>{
        try{
            await Api.delete(`api/admin/aulas/${id}/delete`);
        }
        catch(error){
            console.error("Erro ao deletar classroom:", error);
            throw error;
        }
    }
}