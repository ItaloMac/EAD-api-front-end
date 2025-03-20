import { Api } from "../providers/Api";
import { IProfessorService } from "../interfaces/IProfessorService";

export const ProfessoresService = {
    async getProfessoresByIdCurso(id: string): Promise<IProfessorService[]> {
        try {
            const response = await Api.get<IProfessorService[]>(`api/professor/${id}/professores`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar professores do curso ${id}:`, error);
            return []; 
        }
    },

    async getAllTeachers(): Promise<IProfessorService[]> {
        try {
            const response = await Api.get<IProfessorService[]>(`api/professor/corpo-docente`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar todos os professores:", error);
            return []; 
        }
    }
};
