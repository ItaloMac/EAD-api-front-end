import { useEffect, useState } from "react";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { IGetAllTeachersService } from "../../../interfaces/admin/ITeachersSerivce";
import { Link } from "react-router";
import "./teachers-component.css";

function TeachersComponent() {
  const [teachers, setTeachers] = useState<IGetAllTeachersService[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [selectedTeacherName, setSelectedTeacherName] = useState<string>("");

  useEffect(() => {
    CarregarProfessores();
  }, []);

  async function CarregarProfessores() {
    setLoading(true);
    try {
      const response = await TeachersService.getAllTeachersService();
      setTeachers(response);
    } catch (error) {
      console.error("Erro ao carregar professores:", error);
      setMessageError("Erro ao carregar lista de professores.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!selectedTeacherId) return;

    try {
      await TeachersService.deleteTeacherService(selectedTeacherId);
      setMessage(`Professor ${selectedTeacherName} deletado com sucesso!`);
      setShowModal(false);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== selectedTeacherId));
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
      setMessageError(`Erro ao deletar o professor ${selectedTeacherName}.`);
      setTimeout(() => setMessageError(""), 3000);
    }
  };

  const professoresFiltrados = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-grow-1 px-4">
        <div className="text-center">Carregando professores...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow-1 px-4">
        <h2 className="mb-4">Professores</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <nav className="navbar custom-navbar">
          <div className="div-form">
            <form className="d-flex custom-form-users" role="search">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Pesquisar por nome do professor" 
                aria-label="Search"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </form>
          </div>
        </nav>
        
        <div>
          <Link to="/admin/professor/criar-novo" className="btn btn-primary" style={{ marginBottom: "20px" }} title="Adicionar professor">+ Novo Professor</Link>
        </div>
        
        <div className="table-responsive">
          <table className="table align-middle table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Mini Currículo</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">Nenhum professor encontrado.</td>
                </tr>
              ) : (
                professoresFiltrados.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>
                      <div className="mini-resume">
                        {teacher.miniResume.length > 100 
                          ? `${teacher.miniResume.substring(0, 100)}...`
                          : teacher.miniResume
                        }
                      </div>
                    </td>
                    <td className="text-center">
                      <Link 
                        to={`/admin/professor/${teacher.id}`} 
                        className="bi bi-eye-fill mx-2 text-dark" 
                        title="Dados do professor"
                      ></Link>
                
                      <Link 
                        to={`/admin/professor/${teacher.id}/modulos`} 
                        className="bi bi-book-fill mx-2 text-dark" 
                        title="Módulos do professor"
                      ></Link>
                      <button 
                        onClick={() => {
                          setSelectedTeacherId(teacher.id);
                          setSelectedTeacherName(teacher.name);
                          setShowModal(true);
                        }}
                        className="bi bi-trash-fill mx-2 text-danger btn-link"
                        style={{ marginLeft: "-4px" }} 
                        title="Deletar professor"
                      ></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Tem certeza que deseja deletar o professor {selectedTeacherName}?</h4>
            <p>Esta ação removerá permanentemente o professor do sistema.</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn btn-danger">
                Deletar Professor
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeachersComponent;
