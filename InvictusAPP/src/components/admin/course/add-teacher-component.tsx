import { useState, useEffect } from 'react';
import { CourseService } from '../../../Services/Admin/CourseService';
import { TeachersService } from '../../../Services/Admin/TeachersService';
import { IGetTeachersListService } from '../../../interfaces/admin/ITeachersSerivce';
import { Link } from 'react-router';
import './add-teacher-component.css';

function AddTeacherComponent({ CourseId }: { CourseId: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [teachers, setTeachers] = useState<IGetTeachersListService[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function CarregarProfessores() {
      try {
        const response = await TeachersService.getTeacherListService();
        setTeachers(response);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
        setMessageError("Erro ao carregar lista de professores.");
      }
    }

    CarregarProfessores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeacherId) {
      setMessageError("Por favor, selecione um professor.");
      setTimeout(() => setMessageError(""), 3000);
      return;
    }

    if (!CourseId) {
      setMessageError("ID do curso não encontrado.");
      setTimeout(() => setMessageError(""), 3000);
      return;
    }

    try {
      setLoading(true);
      
      // Enviar apenas o teacherId, CourseId já vai na URL
      await CourseService.addTeacherToCourse(CourseId, { teacherId: selectedTeacherId });
      setMessage("Professor adicionado ao curso com sucesso!");
      
      // Limpar seleção
      setSelectedTeacherId("");
      
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar professor ao curso:", error);
      setMessageError("Erro ao adicionar professor ao curso. Verifique se o professor já não está associado a este curso.");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="row g-3 add-teacher-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Adicionar Professor ao Curso</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-12">
          <label htmlFor="selectTeacher" className="form-label">Selecione o Professor</label>
          <select
            required
            className="form-select"
            id="selectTeacher"
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            disabled={loading}
          >
            <option value="">Escolha um professor para adicionar</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          {teachers.length === 0 && (
            <small className="form-text text-muted">
              Nenhum professor encontrado. <Link to="/admin/professor/criar-novo">Cadastre um novo professor</Link>
            </small>
          )}
        </div>

        <div className="col-12 teacher-info">
          {selectedTeacherId && (
            <div className="selected-teacher-info">
              <strong>Professor selecionado:</strong> {teachers.find(t => t.id === selectedTeacherId)?.name}
            </div>
          )}
        </div>

        <div className="col-12 text-end mt-3">
          <Link 
            to={`/admin/curso/${CourseId}/professores`} 
            className="btn btn-outline-secondary me-2" 
            title="Cancelar"
          >
            Cancelar
          </Link>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !selectedTeacherId}
          >
            {loading ? "Adicionando..." : "Adicionar Professor"}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTeacherComponent;

