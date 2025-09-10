import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IGetAllRegistrationsService } from "../../../interfaces/admin/IRegistrationService";
import { RegistrationService } from "../../../Services/Admin/RegistrationService";
import "../users/usuarios.css";
import formatDateFromISO from "../../../Utils/formatDateFromISO";

function RegistrationsListComponent() {
  const [registrations, setRegistrations] = useState<IGetAllRegistrationsService[]>([]);
  const [filtro, setFiltro] = useState<string>(""); // novo estado
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [selectedRegistrationId, setSelectedUserId] = useState<string | null>(null); // Armazena o ID do usuário selecionado
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
    
  useEffect(() =>{
      async function CarregarMatriculas(){
        try {
          const registrations = await RegistrationService.getAllRegistrations();
          setRegistrations(registrations);
        } catch (Error) {
          console.error("Erro ao carregar matriculas:", Error);
        }
      }
    CarregarMatriculas();
  }, []);

  const handleDelete = async () => {
    if (!selectedRegistrationId) return;

    try {
      await RegistrationService.deleteRegistration(selectedRegistrationId);
      setMessage("Matricula deletada com sucesso.");
      setShowModal(false); // Fecha o modal após a exclusão
      setRegistrations((prev) => prev.filter((user) => user.id !== selectedRegistrationId)); // Remove o usuário da lista
    } catch (error) {
      console.error("Erro ao deleta a matricula:", error);
      setMessageError("Erro ao deletar matrícula.");
    }
  };

  const matriculasFiltradas = registrations.filter((registration) =>
    `${registration.user.name} ${registration.user.lastName} ${registration.class.curso.name} ${registration.class.name}`
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <>
          <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Matrículas Cadastradas</h2>
            <nav className="navbar custom-navbar">
            <div className="div-form">
              <form className="d-flex custom-form-users" role="search">
                <input className="form-control me-2" type="search" placeholder="Pesquise por aluno, curso ou turma" aria-label="Search" 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}/>
              </form>
            </div>
          </nav>
          <div>
            <Link to={`/admin/matricula/cadastrar-nova`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Nova matrícula">Nova Matrícula</Link>
          </div>
            <div className="table-responsive">
              <table className="table align-middle table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Telefone</th>
                    <th>Curso</th>
                    <th>Turma</th>
                    <th>Data de criação</th>
                    <th>Data de cancelamento</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">Nenhuma matrícula encontrada.</td>
                    </tr>
                  ) : (
                    matriculasFiltradas.map((registration, index) => (
                      <tr key={index}>
                        <td>{registration.user.name}</td>
                        <td>{registration.user.lastName}</td>
                        <td>{registration.user.phoneNumver}</td>
                        <td>{registration.class.curso.name}</td>
                        <td>{registration.class.name}</td>
                        <td>{formatDateFromISO(registration.registrationDate)}</td>
                        <td>{formatDateFromISO(registration.cancellationDate || "N/A")}</td>
                        <td className="text-center">
                          <Link to={`/admin/matricula/${registration.id}`} className="bi bi-eye-fill mx-2 text-dark" title="Dados da matrícula"></Link>
                          <button onClick={() => {
                            setSelectedUserId(registration.id);
                            setShowModal(true);
                          }}
                          className="bi bi-trash-fill text-danger btn-link"
                          style={{ marginLeft: "8px" }} 
                          title="Excluir"
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
            <h4>Tem certeza que deseja deletar esta matrícula?</h4>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn btn-danger">
                Deletar matrícula
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

export default RegistrationsListComponent;
