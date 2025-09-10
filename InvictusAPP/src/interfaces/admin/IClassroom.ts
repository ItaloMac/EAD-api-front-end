export interface IClassroomresponse {
    id: string;
    theme: string;
    startDate: string;
    classroom: string;
    videoUrl: string;
    moduloId:string;

}

export interface ICreateClassroomService {
    theme: string;
    startDate: string;
    classroom: string;
    moduloId:string;
    videoUrl?: string;
}

export interface IUpdateClassroomService {
    id: string;
    theme?: string;
    startDate?: string;
    classroom?: string;
    videoUrl?: string;
    moduloId:string;
}