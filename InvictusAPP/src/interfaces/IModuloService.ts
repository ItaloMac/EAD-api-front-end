export interface IModuloService {
    id: string,
    theme: string,
    startDate: string,
    endDate: string,
    workload: string,  // Mudou de workLoad para workload
    curso: {           // Mudou de id_Curso para curso (objeto)
        id: string,
        name: string
    },
    professor: {       // Mudou de id_Professor para professor (objeto)
        id: string,
        name: string
    };
    description: string;
}