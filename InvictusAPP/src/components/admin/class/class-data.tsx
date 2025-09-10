import { useEffect, useState } from "react";
import { ClassService } from "../../../Services/Admin/ClassService";
import { CourseService } from "../../../Services/Admin/CourseService";
import { IGetCoursesListService } from "../../../interfaces/admin/ICourseService";
import "./class-data.css";
import { Link } from "react-router";
import formatDateWhileTyping from "../../../Utils/formatDateWhileTyping";
import formatDateFromISO from "../../../Utils/formatDateFromISO";

function ClassDataComponent({ classId }: { classId: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<IGetCoursesListService[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    relacionedCourse: {
      id: "",
      name: ""
    }
  });

  useEffect(() => {
    async function CarregarTodosDados() {
      setLoading(true);
      
      try {
        const [turmaResponse, cursosResponse] = await Promise.all([
          ClassService.getClassById(classId),
          CourseService.getAllCourses()
        ]);

        // Define dados da turma com formatação correta das datas
        setFormData({
          name: turmaResponse.name || "",
          startDate: formatDateFromISO(turmaResponse.startDate),
          endDate: formatDateFromISO(turmaResponse.endDate),
          relacionedCourse: {
            id: turmaResponse.relacionedCourse.id,
            name: turmaResponse.relacionedCourse.name
          }
        });

        // Define opções do select de cursos
        setCourses(cursosResponse);

      } catch (error) {
        console.error("Erro ao carregar dados da turma:", error);
        setMessageError("Erro ao carregar dados da turma.");
      } finally {
        setLoading(false);
      }
    }

    CarregarTodosDados();
  }, [classId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "inputName":
        setFormData((prev) => ({
          ...prev,
          name: value
        }));
        break;
      case "inputStartDate":
        setFormData((prev) => ({
          ...prev,
          startDate: formatDateWhileTyping(value)
        }));
        break;
      case "inputEndDate":
        setFormData((prev) => ({
          ...prev,
          endDate: formatDateWhileTyping(value)
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      id: classId,
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      relacionedCourse: formData.relacionedCourse
    };

    ClassService.updateClass(updateData)
      .then(() => {
        setMessage("Dados da turma atualizados com sucesso!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar dados da turma:", error);
        setMessageError("Erro ao atualizar dados da turma. Confira se todos os campos estão corretos.");
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
        <p>Carregando dados da turma...</p>
      </div>
    );
  }

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados da Turma</h2>
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
            required
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputrelacionedCourse">Curso</label>
          <select
            required
            className="form-control"
            id="inputrelacionedCourse"
            value={formData.relacionedCourse.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                relacionedCourse: {
                  id: e.target.value,
                  name: courses.find((u) => u.id === e.target.value)?.name || ""
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
          <label htmlFor="inputEndDate">Data de Fim</label>
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
          <Link to={`/admin/turmas/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Salvar alterações</button>
        </div>
      </form>
    </>
  );
}

export default ClassDataComponent;
