import { useEffect, useState } from "react";
import { RegistrationService } from "../../../Services/Admin/RegistrationService";
import { ClassService } from "../../../Services/Admin/ClassService"; 
import { UsersService } from "../../../Services/Admin/UsersService";
import formatDateFromISO from "../../../Utils/formatDateFromISO";
import "../users/user-data.css";
import formatDateWhileTyping from "../../../Utils/formatDateWhileTyping";
import { Link } from "react-router";

function RegistrationDataComponent({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true); // ← Adicionar loading
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]); 
  const [users, setUsers] = useState<{ id: string; name: string; lastName: string }[]>([]);
  const [formData, setFormData] = useState({
    registrationStatus: "",
    registrationDate: "",
    cancellationDate: "",
    class: {
      id: "", 
      name: ""
    },
    user: {
      id: "", 
      name: "", 
    },
    vindiPlanId: ""
  });

  useEffect(() => {
    async function CarregarTodosDados() {
      setLoading(true);
      
      try {
        const [matriculaResponse, turmasResponse, usuariosResponse] = await Promise.all([
          RegistrationService.getRegistrationById(id),
          ClassService.getAllClasses(),
          UsersService.getAllUsers()
        ]);

        // Define opções dos selects primeiro
        setClasses(turmasResponse);
        setUsers(usuariosResponse);

        // Agora define dados da matrícula com os arrays carregados
        const selectedClass = turmasResponse.find((c: { id: string; name: string }) => c.name === matriculaResponse.class?.name);
        const selectedUser = usuariosResponse.find((u: { id: string; name: string; lastName: string }) => 
          u.name === matriculaResponse.user?.name && u.lastName === matriculaResponse.user?.lastName
        );

        setFormData({
          registrationStatus: matriculaResponse.registrationStatus || "",
          registrationDate: formatDateFromISO(matriculaResponse.registrationDate || ""),
          cancellationDate: formatDateFromISO(matriculaResponse.cancellationDate || ""),
          class: { 
            id: selectedClass?.id || "", 
            name: matriculaResponse.class?.name || ""
          },
          user: { 
            id: selectedUser?.id || "", 
            name: matriculaResponse.user?.name || ""
          },
          vindiPlanId: matriculaResponse.vindiPlanId || ""
        });

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setMessageError("Erro ao carregar dados da matrícula.");
      } finally {
        setLoading(false);
      }
    }

    CarregarTodosDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "inputStatus":
        setFormData((prev) => ({
          ...prev,
          registrationStatus: value
        }));
        break;
      case "inputRegistrationDate":
        setFormData((prev) => ({
          ...prev,
          registrationDate: formatDateWhileTyping(value)
        }));
        break;
      case "inputCancellationDate":
        setFormData((prev) => ({
          ...prev,
          cancellationDate: formatDateWhileTyping(value)
        }));
        break;
      case "inputVindiPlanId":
        setFormData((prev) => ({
          ...prev,
          vindiPlanId: value
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDataRegistration = {
      registrationStatus: formData.registrationStatus,
      registrationDate: formData.registrationDate,
      cancellationDate: formData.cancellationDate || undefined,
      class: {
        id: formData.class.id,
        name: formData.class.name
      },
      user: {
        id: formData.user.id,
        name: formData.user.name
      },
      vindiPlanId: formData.vindiPlanId
    };

    RegistrationService.updateRegistration(id, newDataRegistration)
      .then(() => {
        setMessage("Dados atualizados com sucesso!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar dados da matrícula:", error);
        setMessageError("Erro ao atualizar dados da matrícula. Confira se todos os campos estão corretos.");
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
        <p>Carregando dados da matrícula...</p>
      </div>
    );
  }

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados da matrícula</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputStatus">Status</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputStatus"
            value={formData.registrationStatus}
            onChange={handleChange}
            placeholder="Ex: Ativo, Inativo"
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputRegistrationDate">Data de matrícula</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputRegistrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            placeholder="DD-MM-AAAA"
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputCancellationDate">Data de cancelamento</label>
          <input
            type="text"
            className="form-control"
            id="inputCancellationDate"
            value={formData.cancellationDate}
            onChange={handleChange}
            placeholder="DD-MM-AAAA (opcional)"
          />
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputClass">Turma</label>
          <select
            required
            className="form-select"
            id="inputClass"
            value={formData.class.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                class: {
                  id: e.target.value,
                  name: classes.find((c) => c.id === e.target.value)?.name || ""
                }
              }))
            }
          >
            <option value="">Selecione uma turma</option>
            {classes.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputUser">Aluno</label>
          <select
            required
            className="form-select"
            id="inputUser"
            value={formData.user.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user: {
                  id: e.target.value,
                  name: users.find((u) => u.id === e.target.value)?.name || ""
                }
              }))
            }
          >
            <option value="">Selecione um aluno</option>
            {users.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.name} {usuario.lastName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputVindiPlanId">Plano Vindi</label>
          <input
            type="number"
            className="form-control"
            id="inputVindiPlanId"
            value={formData.vindiPlanId}
            onChange={handleChange}
            placeholder="ID do plano Vindi"
          />
        </div>
        
        <div className="col-12 text-end mt-3">
        <Link to={`/admin/matriculas/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </>
  );
}

export default RegistrationDataComponent;