import { Api } from '../../providers/Api';
import { IGetCoursesListService, IGetAllCoursesService, IGetCourseByIDService, IUpdateCourseByIdService, ICreateCourseService, IGetTeachersByIdCourseService } from '../../interfaces/admin/ICourseService';
import { IGetClassByIdService } from '../../interfaces/admin/IClassService';

export const CourseService = {
    async getAllCourses(): Promise<IGetCoursesListService[]> {
        try {
            const response = await Api.get<IGetCoursesListService[]>("api/admin/cursos");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
            throw error;
        }
    },

    async getCoursesWithDetails(): Promise<IGetAllCoursesService[]> {
        try {
            const response = await Api.get<IGetAllCoursesService[]>("api/admin/cursos");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
            throw error;
        }
    },

    async getCourseById(id: string): Promise<IGetCourseByIDService> {
        try {
            const response = await Api.get<IGetCourseByIDService>(`api/admin/cursos/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar curso por ID:", error);
            throw error;
        }
    },

    async updateCourseById(id: string, courseData: IUpdateCourseByIdService): Promise<IUpdateCourseByIdService> {
        try {
            const response = await Api.put<IUpdateCourseByIdService>(`api/admin/cursos/update/${id}`, courseData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar curso:", error);
            throw error;
        }
    },

    async createCourse(courseData: ICreateCourseService): Promise<ICreateCourseService> {
        try {
            const response = await Api.post<ICreateCourseService>("api/admin/cursos/create", courseData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar curso:", error);
            throw error;
        }
    },

    async getClassesByIdCourse(id: string): Promise<IGetClassByIdService[]> {
        try {
            const response = await Api.get<IGetClassByIdService[]>(`api/admin/cursos/${id}/turmas`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar turmas por ID do curso:", error);
            throw error;
        }
    },

    async getTeachersByIdCourse(id: string): Promise<IGetTeachersByIdCourseService[]> {
        try {
            const response = await Api.get<IGetTeachersByIdCourseService[]>(`api/admin/cursos/${id}/professores`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar professores por ID do curso:", error);
            throw error;
        }
    },

    async addTeacherToCourse(courseId: string, professorData: { teacherId: string }): Promise<void> {
        try {
            // Backend espera professorId no body
            const body = { professorId: professorData.teacherId };
            await Api.post(`api/admin/cursos/adicionar-professor/${courseId}`, body);
        } catch (error) {
            console.error("Erro ao adicionar professor ao curso:", error);
            throw error;
        }
    },

    async removeTeacherFromCourse(CourseId: string, teacherId: string): Promise<void> {
        try {
            await Api.delete(`api/admin/cursos/delete-teacher/${CourseId}/${teacherId}`);
        } catch (error) {
            console.error("Erro ao remover professor do curso:", error);
            throw error;
        }
    }
}
