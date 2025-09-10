export interface IGetAllClassesService {
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    relacionedCourse: {
      id: string,
      name: string
    },
    relacionedRegistrations: [
    {
        id: string
    }
]
}

export interface ICreateClassService {
    name: string,
    startDate: string,
    endDate: string,
    relacionedCourse: {
      id: string,
      name: string
    },
}

export interface IUpdateClassService {
    id: string,
    name?: string,
    startDate?: string,
    endDate?: string,
    relacionedCourse?: {
      id: string,
      name: string
    },
}

export interface IGetClassByIdService {
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    relacionedCourse: {
      id: string,
      name: string
    },
    relacionedRegistrations: [
    {
        id: string
    } ]
}
