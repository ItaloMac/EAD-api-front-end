import { useState, useEffect } from 'react';
import { ClassService } from '../../../Services/Admin/ClassService';
import { CourseService } from '../../../Services/Admin/CourseService';
import { ICreateClassService } from '../../../interfaces/admin/IClassService';
import { IGetCoursesListService } from '../../../interfaces/admin/ICourseService';
import "./class-create.css";
import { Link } from 'react-router';
import formatDateWhileTyping from '../../../Utils/formatDateWhileTyping';

function ClassCreateComponent() {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
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
    async function CarregarCursos() {
      try {
        const response = await CourseService.getAllCourses();
        setCourses(response);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    }
    CarregarCursos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "inputName":
        setFormData((prev) => ({
          ...prev,
          name: value
        }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDataClass: ICreateClassService = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      relacionedCourse: {
        id: formData.relacionedCourse.id,
        name: formData.relacionedCourse.name
      }
    };

    try {
      await ClassService.createClass(newDataClass);
      setMessage("Turma criada com sucesso.");
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        relacionedCourse: {
          id: "",
          name: ""
        }
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      setMessageError("Erro ao criar turma.");
      setTimeout(() => setMessageError(""), 3000);
    }
  };

  return (
    <>
      <form className="row g-3" style={{ marginLeft:'30px', marginRight:'30px', marginTop:'10px' }} onSubmit={handleSubmit}>
        <h2 className="mb-4">Criar Nova Turma</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-md-6">
          <label htmlFor="inputName" className='form-label'>Nome da Turma</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Turma A 2024"
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="inputCourse" className='form-label'>Curso</label>
          <select
            required
            className="form-select"
            id="inputCourse"
            value={formData.relacionedCourse.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                relacionedCourse: {
                  id: e.target.value,
                  name: courses.find((c) => c.id === e.target.value)?.name || ""
                }
              }))
            }
          >
            <option value="">Selecione um curso</option>
            {courses.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6">
          <label htmlFor="inputStartDate" className='form-label'>Data de Início</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputStartDate"
            placeholder='DD-MM-YYYY'
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="inputEndDate" className='form-label'>Data de Fim</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputEndDate"
            value={formData.endDate}
            placeholder='DD-MM-YYYY'
            onChange={handleChange}
          />
        </div>
        
        <div className="col-12 text-end mt-3">
          <Link to={`/admin/turmas/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">
            Criar Turma
          </button>
        </div>
      </form>
    </>
  );
}

export default ClassCreateComponent;
