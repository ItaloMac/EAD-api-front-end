import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CourseService } from "../../../Services/Admin/CourseService";
import { ClassService } from "../../../Services/Admin/ClassService";
import { IGetCoursesListService } from "../../../interfaces/admin/ICourseService";
import "../module/add-module-component.css";
import formatDateWhileTyping from "../../../Utils/formatDateWhileTyping";

function AddClassCourseComponent({ courseId }: { courseId: string }) {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<IGetCoursesListService | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: ""
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
        const [cursosResponse] = await Promise.all([
          CourseService.getAllCourses()
        ]);

        // Encontrar o curso específico
        const foundCourse = cursosResponse.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setMessageError("Curso não encontrado.");
        }

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
      case "inputName":
        setFormData((prev) => ({ ...prev, name: value }));
        break;
      case "inputStartDate":
        setFormData((prev) => ({ ...prev, startDate: formatDateWhileTyping(value) }));
        break;
      case "inputEndDate":
        setFormData((prev) => ({ ...prev, endDate: formatDateWhileTyping(value) }));
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
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      relacionedCourse: {
        id: courseId,
        name: course.name
      }
    };

    ClassService.createClass(createData)
      .then(() => {
        setMessage("Turma criada com sucesso!");
        setTimeout(() => {
          navigate(`/admin/curso/${courseId}/turmas`);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao criar turma:", error);
        setMessageError("Erro ao criar turma. Confira se todos os campos estão corretos.");
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
        <h2 className="mb-4">Nova Turma</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputName">Nome da Turma</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome da turma"
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
        
        <div className="col-12 text-end mt-3">
          <Link 
            to={`/admin/curso/${courseId}/turmas`}
            className="btn btn-outline-secondary" 
            style={{marginRight:'5px'}} 
            title="Cancelar"
          >
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Criar Turma
          </button>
        </div>
      </form>
    </>
  );
}

export default AddClassCourseComponent;
