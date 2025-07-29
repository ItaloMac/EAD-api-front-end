import { useEffect, useState } from "react";
import { IGetAllUsersService } from "../../../interfaces/admin/IUsersService";
import { UsersService } from "../../../Services/Admin/UsersService";
import { Link } from "react-router";

function UsersList() {
  const [usuarios, setUsers] = useState<IGetAllUsersService[]>([]);
    
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

  return (
    <>

          <div className="flex-grow-1 p-4">
            <h2 className="mb-4">Alunos Cadastrados</h2>

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
                    usuarios.map((usuario, index) => (
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
