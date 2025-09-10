import { useEffect, useState } from "react";
import { IGetAllUsersService } from "../../../interfaces/admin/IUsersService";
import { UsersService } from "../../../Services/Admin/UsersService";
import { Link } from "react-router";
import "./usuarios.css"; // Import the CSS file for styling

function UsersList() {
  const [usuarios, setUsers] = useState<IGetAllUsersService[]>([]);
  const [filtro, setFiltro] = useState<string>(""); // novo estado
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Armazena o ID do usuário selecionado
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
    
  useEffect(() =>{
      async function CarregarUsuarios(){
        try {
          const usuarios = await UsersService.getAllUsers();
          setUsers(usuarios);
        } catch (Error) {
          console.error("Erro ao carregar cursos:", Error);
        }
      }
    CarregarUsuarios();
  }, []);

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      await UsersService.deleteUser(selectedUserId);
      setMessage("Usuário deletado com sucesso.");
      setShowModal(false); // Fecha o modal após a exclusão
      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId)); // Remove o usuário da lista
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      setMessageError("Erro ao deletar usuário.");
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.name} ${usuario.lastName} ${usuario.email}`
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <>
          <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Alunos Cadastrados</h2>
            <nav className="navbar custom-navbar">
            <div className="div-form">
              <form className="d-flex custom-form-users" role="search">
                <input className="form-control me-2" type="search" placeholder="Pesquisar aluno" aria-label="Search" 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}/>
              </form>
            </div>
          </nav>

            <div className="table-responsive">
              <table className="table align-middle table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Email</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">Nenhum usuário encontrado.</td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((usuario, index) => (
                      <tr key={index}>
                        <td>{usuario.name}</td>
                        <td>{usuario.lastName}</td>
                        <td>{usuario.email}</td>
                        <td className="text-center">
                          <Link to={`/admin/aluno/${usuario.id}`} className="bi bi-eye-fill mx-2 text-dark" title="Dados do aluno"></Link>
                          <Link to={`/admin/aluno/${usuario.id}/matriculas`} className="bi bi-clipboard2 mx-2 text-dark" title="Matrículas"></Link>
                          <button onClick={() => {
                            setSelectedUserId(usuario.id);
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
            <h4>Tem certeza que deseja deletar este usuário?</h4>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn btn-danger">
                Deletar Usuário
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

export default UsersList;
