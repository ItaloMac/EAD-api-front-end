import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ModuleService } from "../../../Services/Admin/ModuleService";
import { CourseService } from "../../../Services/Admin/CourseService";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { IGetCoursesListService } from "../../../interfaces/admin/ICourseService";
import { IGetAllTeachersService } from "../../../interfaces/admin/ITeachersSerivce";
import "./add-module-component.css";

function AddModuleComponent({ courseId }: { courseId: string }) {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<IGetCoursesListService | null>(null);
  const [teachers, setTeachers] = useState<IGetAllTeachersService[]>([]);
  const [formData, setFormData] = useState({
    theme: "",
    description: "",
    startDate: "",
    endDate: "",
    workload: "",
    professor: {
      id: "",
      name: ""
    }
  });

  useEffect(() => {
    async function CarregarDados() {
      if (!courseId) {
        setMessageError("ID do curso não encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const [cursosResponse, professoresResponse] = await Promise.all([
          CourseService.getAllCourses(),
          TeachersService.getAllTeachersService()
        ]);

        // Encontrar o curso específico
        const foundCourse = cursosResponse.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setMessageError("Curso não encontrado.");
        }

        setTeachers(professoresResponse);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setMessageError("Erro ao carregar dados necessários.");
      } finally {
        setLoading(false);
      }
    }

    CarregarDados();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!course || !courseId) {
      setMessageError("Dados do curso não encontrados.");
      return;
    }

    const createData = {
      theme: formData.theme,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      workload: formData.workload,
      curso: {
        id: courseId,
        name: course.name
      },
      professor: formData.professor
    };

    ModuleService.createModule(createData)
      .then(() => {
        setMessage("Módulo criado com sucesso!");
        setTimeout(() => {
          navigate(`/admin/curso/${courseId}/modulos`);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao criar módulo:", error);
        setMessageError("Erro ao criar módulo. Confira se todos os campos estão corretos.");
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
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Novo Módulo</h2>
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
            placeholder="Digite o tema do módulo"
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
          <input
            type="text"
            className="form-control"
            id="inputCurso"
            value={course?.name || "Curso não encontrado"}
            readOnly
            style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
          />
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
              placeholder="Descreva o conteúdo e objetivos do módulo..."
              required
            />
          </div>
        
        <div className="col-12 text-end mt-3">
          <Link 
            to={`/admin/cursos/${courseId}/modulos`}
            className="btn btn-outline-secondary" 
            style={{marginRight:'5px'}} 
            title="Cancelar"
          >
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Criar Módulo
          </button>
        </div>
      </form>
    </>
  );
}

export default AddModuleComponent;
