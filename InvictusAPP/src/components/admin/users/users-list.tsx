import { useEffect, useState } from "react";
import { IGetAllUsersService } from "../../../interfaces/admin/IUsersService";
import { UsersService } from "../../../Services/Admin/UsersService";
import { Link } from "react-router";
import "./usuarios.css"; // Import the CSS file for styling

function UsersList() {
  const [usuarios, setUsers] = useState<IGetAllUsersService[]>([]);
  const [filtro, setFiltro] = useState<string>(""); // novo estado

    
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
              <form className="d-flex custom-form" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}/>
                <button className=" custom-buttom-navbar" type="submit">Pesquisar Aluno</button>
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
                        <Link to={`/admin/aluno/${usuario.id}`} className="bi bi-person-gear mx-2 text-dark" title="Dados do aluno"></Link>
                        <Link to={`/admin/aluno/${usuario.id}/matriculas`} className="bi bi-clipboard2 mx-2 text-dark" title="Matrículas"></Link>
                        <Link to={`/admin/aluno/${usuario.id}/atualizar-dados`} className="bi bi-pencil-square mx-2 text-dark" title="Atualizar dados"></Link>
                        <Link to={`/admin/aluno/${usuario.id}/excluir`} className="bi bi-person-dash-fill mx-2 text-dark" title="Excluir"></Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
    </>
  );
}

export default UsersList;
