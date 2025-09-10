export interface IGetAllModulesService {
    id: string;
    theme: string;
    description: string;
    startDate: string;
    endDate: string;
    workload: string;
    curso: {
        id: string;
        name: string;
        }
    professor: {
        id: string;
        name: string;
    };
    aulas: string[];
}

export interface IGetModuleByIdService {
    id: string;
    theme: string;
}

export interface ICreateModuleService {
    theme: string;
    description: string;
    startDate: string;
    endDate: string;
    workload: string;
    curso: {
        id: string;
        name: string;
    }
    professor: {
        id: string;
        name: string;
    }
}

export interface IUpdateModuleService {
    id: string;
    theme?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    workload?: string;
    curso: {
        id: string;
        name: string;
    }
    professor: {
        id: string;
        name: string;
    }
}


