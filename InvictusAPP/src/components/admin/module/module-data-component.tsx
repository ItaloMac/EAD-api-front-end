import { useEffect, useState } from "react";
import { ModuleService } from "../../../Services/Admin/ModuleService";
import { CourseService } from "../../../Services/Admin/CourseService";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { IGetAllModulesService } from "../../../interfaces/admin/IModulesService";
import { IGetCoursesListService } from "../../../interfaces/admin/ICourseService";
import { IGetAllTeachersService } from "../../../interfaces/admin/ITeachersSerivce";
import { Link } from "react-router";
import "./module-data-component.css";

function ModuleDataComponent({ moduleId }: { moduleId: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<IGetCoursesListService[]>([]);
  const [teachers, setTeachers] = useState<IGetAllTeachersService[]>([]);
  const [formData, setFormData] = useState({
    theme: "",
    description: "",
    startDate: "",
    endDate: "",
    workload: "",
    curso: {
      id: "",
      name: ""
    },
    professor: {
      id: "",
      name: ""
    }
  });

  useEffect(() => {
    async function CarregarTodosDados() {
      setLoading(true);
      
      try {
        const [modulesResponse, cursosResponse, professoresResponse] = await Promise.all([
          ModuleService.getAllModules(),
          CourseService.getAllCourses(),
          TeachersService.getAllTeachersService()
        ]);

        // Encontrar o módulo específico
        const module = modulesResponse.find((mod: IGetAllModulesService) => mod.id === moduleId);
        
        if (module) {
          setFormData({
            theme: module.theme || "",
            description: module.description || "",
            startDate: module.startDate,
            endDate: module.endDate,
            workload: module.workload || "",
            curso: {
              id: module.curso.id,
              name: module.curso.name
            },
            professor: {
              id: module.professor.id,
              name: module.professor.name
            }
          });
        }

        setCourses(cursosResponse);
        setTeachers(professoresResponse);

      } catch (error) {
        console.error("Erro ao carregar dados do módulo:", error);
        setMessageError("Erro ao carregar dados do módulo.");
      } finally {
        setLoading(false);
      }
    }

    CarregarTodosDados();
  }, [moduleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "inputTheme":
        setFormData((prev) => ({ ...prev, theme: value }));
        break;
      case "inputDescription":
        setFormData((prev) => ({ ...prev, description: value }));
        break;
      case "inputStartDate":
        setFormData((prev) => ({ ...prev, startDate: value }));
        break;
      case "inputEndDate":
        setFormData((prev) => ({ ...prev, endDate: value }));
        break;
      case "inputWorkload":
        setFormData((prev) => ({ ...prev, workload: value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      id: moduleId,
      theme: formData.theme,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      workload: formData.workload,
      curso: formData.curso,
      professor: formData.professor
    };

    ModuleService.updateModule(updateData)
      .then(() => {
        setMessage("Dados do módulo atualizados com sucesso!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar dados do módulo:", error);
        setMessageError("Erro ao atualizar dados do módulo. Confira se todos os campos estão corretos.");
        setTimeout(() => {
          setMessageError("");
        }, 3000);
      });
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p>Carregando dados do módulo...</p>
      </div>
    );
  }

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados do Módulo</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputTheme">Tema</label>
          <input
            type="text"
            className="form-control"
            id="inputTheme"
            value={formData.theme}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputWorkload">Carga Horária</label>
          <input
            type="text"
            className="form-control"
            id="inputWorkload"
            value={formData.workload}
            onChange={handleChange}
            placeholder="Ex: 40h"
            required
          />
        </div>
        
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputCurso">Curso</label>
          <select
            required
            className="form-control"
            id="inputCurso"
            value={formData.curso.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                curso: {
                  id: e.target.value,
                  name: courses.find((c) => c.id === e.target.value)?.name || ""
                }
              }))
            }
          >
            <option value="">Selecione um curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputProfessor">Professor</label>
          <select
            required
            className="form-control"
            id="inputProfessor"
            value={formData.professor.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                professor: {
                  id: e.target.value,
                  name: teachers.find((t) => t.id === e.target.value)?.name || ""
                }
              }))
            }
          >
            <option value="">Selecione um professor</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputStartDate">Data de Início</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputStartDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="DD-MM-AAAA"
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputEndDate">Data de Término</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputEndDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="DD-MM-AAAA"
          />
        </div>

        <div className="row">
          <label htmlFor="inputDescription">Descrição</label>
          <textarea
            className="form-control"
            id="inputDescription"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        
        <div className="col-12 text-end mt-3">
          <Link 
          to={`/admin/curso/${formData.curso.id}/modulos`}
            className="btn btn-outline-secondary" 
            style={{marginRight:'5px'}} 
            title="cancelar"
          >
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </>
  );
}

export default ModuleDataComponent;
