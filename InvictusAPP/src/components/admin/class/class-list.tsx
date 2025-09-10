import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IGetAllClassesService } from "../../../interfaces/admin/IClassService";
import { ClassService } from "../../../Services/Admin/ClassService";
import "../users/usuarios.css";
import "./class-list.css";
import formatDateFromISO from "../../../Utils/formatDateFromISO";

function ClassListComponent() {
  const [classes, setClasses] = useState<IGetAllClassesService[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
    
  useEffect(() => {
    async function CarregarTurmas() {
      try {
        const classes = await ClassService.getAllClasses();
        setClasses(classes);
      } catch (Error) {
        console.error("Erro ao carregar turmas:", Error);
      }
    }
    CarregarTurmas();
  }, []);

  const handleDelete = async () => {
    if (!selectedClassId) return;

    try {
      await ClassService.deleteClass(selectedClassId);
      setMessage("Turma deletada com sucesso.");
      setShowModal(false);
      setClasses((prev) => prev.filter((classItem) => classItem.id !== selectedClassId));
    } catch (error) {
      console.error("Erro ao deletar a turma:", error);
      setMessageError("Erro ao deletar turma.");
    }
  };

  const turmasFiltradas = classes.filter((classItem) =>
    `${classItem.name} ${classItem.relacionedCourse.name}`
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <>
      <div className="flex-grow-1 px-4">
        <h2 className="mb-4">Turmas Cadastradas</h2>
        <nav className="navbar custom-navbar">
          <div className="div-form">
            <form className="d-flex custom-form-users" role="search">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Pesquise por turma ou curso" 
                aria-label="Search" 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </form>
          </div>
        </nav>
        <div>
          <Link to={`/admin/turma/criar-nova`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Nova turma">Nova Turma</Link>
        </div>
        <div className="table-responsive">
          <table className="table align-middle table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nome da Turma</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Curso</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">Nenhuma turma encontrada.</td>
                </tr>
              ) : (
                turmasFiltradas.map((classItem, index) => (
                  <tr key={index}>
                    <td>{classItem.name}</td>
                    <td>{formatDateFromISO(classItem.startDate.toString())}</td>
                    <td>{formatDateFromISO(classItem.endDate.toString())}</td>
                    <td>{classItem.relacionedCourse.name}</td>
                    <td className="text-center">
                      <Link 
                        to={`/admin/turma/matriculas/${classItem.id}`} 
                        className="bi bi-clipboard2 me-2 text-dark" 
                        title="Ver matrículas da turma"
                      ></Link>
                      <Link 
                        to={`/admin/turma/${classItem.id}`} 
                        className="bi bi-eye-fill mx-2 text-dark" 
                        title="Dados da turma"
                      ></Link>
                      <button 
                        onClick={() => {
                          setSelectedClassId(classItem.id);
                          setShowModal(true);
                        }}
                        className="bi bi-trash-fill text-danger btn-link"
                        style={{ marginLeft: "8px" }} 
                        title="Excluir turma"
                      ></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Tem certeza que deseja deletar esta turma?</h4>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn btn-danger">
                Deletar turma
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

      {/* Mensagens de sucesso ou erro */}
      {message && <p className="success-message">{message}</p>}
      {messageError && <p className="error-message">{messageError}</p>}
    </>
  );
}

export default ClassListComponent;
