export interface IGetCoursesListService {
    id: string,
    name: string
}

interface ICoordenador {
    id: string;
    name: string | null;
}

export interface IGetAllCoursesService {
    id: string;
    status: boolean;
    name: string;
    type: string;
    presentation: string;
    startForecast: string;
    modality: string;
    location: string;
    workload: string;
    duration: string;
    proposal: string;
    requirements: string;
    documentation: string;
    curriculum: string;
    registrationPrice: string;
    monthlyPrice: number;
    totalPrice: number;
    installments: number;
    cashPrice: number;
    fullPrice: number;
    discount: string;
    imagemUrl: string;
    coordenador: ICoordenador;
}

export interface IGetCourseByIDService {
    id: string;
    status: boolean;
    name: string;
    type: string;
    presentation: string;
    startForecast: string;
    modality: string;
    location: string;
    workload: string;
    duration: string;
    proposal: string;
    requirements: string;
    documentation: string;
    curriculum: string;
    registrationPrice: string;
    monthlyPrice: number;
    totalPrice: number;
    installments: number;
    cashPrice: number;
    fullPrice: number;
    discount: string;
    imagemUrl: string;
    coordenador: ICoordenador;
}

export interface IUpdateCourseByIdService {
    status?: boolean;
    name: string;
    type: string;
    presentation: string;
    startForecast: string;
    modality: string;
    location: string;
    workload: string;
    duration: string;
    proposal: string;
    requirements: string;
    documentation: string;
    curriculum: string;
    registrationPrice: string;
    monthlyPrice: number;
    totalPrice: number;
    installments: number;
    cashPrice: number;
    fullPrice: number;
    discount?: string;
    imagemUrl?: string;
    coordenadorId?: string;
}

export interface ICreateCourseService {
    status?: boolean;
    name: string;
    type: string;
    presentation: string;
    startForecast: string;
    modality: string;
    location: string;
    workload: string;
    duration: string;
    proposal: string;
    requirements: string;
    documentation: string;
    curriculum: string;
    registrationPrice: string;
    monthlyPrice: number;
    totalPrice: number;
    installments: number;
    cashPrice: number;
    fullPrice: number;
    discount?: string;
    imagemUrl?: string;
    coordenadorId?: string;
}

export interface IGetClassesByCourseIDService {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
}

export interface IGetTeachersByIdCourseService{
    id: string;
    name: string;
    miniResume: string;
    imageUrl: string;
}

export interface IAssignTeacherToCourseService {
    teacherId: string;
}