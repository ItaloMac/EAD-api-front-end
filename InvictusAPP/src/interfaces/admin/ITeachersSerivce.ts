export interface IGetAllTeachersService {
    id: string;
    name: string;
    miniResume: string;
    imagemUrl: string;
}

export interface IGetTeachersListService{
    id: string;
    name: string;
}

export interface IGetModulesByIdTeacherService {
    id: string;
    theme: string;
    startDate: string;
    endDate: string;
}

export interface ICreateTeacherService {
    name: string;
    miniResume: string;
    imagemUrl: string;
}

export interface IGetTeacherByIdService{
    id: string;
    name: string;
    miniResume: string;
    imagemUrl: string;
}

export interface IUpdateTeacherByIdService {
    name: string;
    miniResume: string;
    imagemUrl: string;
}