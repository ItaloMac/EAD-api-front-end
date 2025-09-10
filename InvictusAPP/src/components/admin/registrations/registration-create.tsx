import { useState, useEffect } from 'react';
import { RegistrationService } from '../../../Services/Admin/RegistrationService';
import { ICreateRegistrationService } from '../../../interfaces/admin/IRegistrationService';
import { UsersService } from '../../../Services/Admin/UsersService';
import { ClassService } from '../../../Services/Admin/ClassService';
import formatDateWhileTyping from '../../../Utils/formatDateWhileTyping';
import "./registration-create.css"
import { Link, useNavigate } from 'react-router';

function RegistrationCreateComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
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
    async function CarregarUsuarios(){
        try{
            const response = await UsersService.getAllUsers();
            setUsers(response);
        }
        catch(error) {
            console.error("Erro ao carregar usuários:", error);
        }
    }

    async function CarregarTurmas() {
      try {
        const response = await ClassService.getAllClasses();
        setClasses(response);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      }
    }
    CarregarUsuarios();
    CarregarTurmas();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDataRegistration: ICreateRegistrationService ={
        registrationStatus: formData.registrationStatus,
        registrationDate: formData.registrationDate,
        cancellationDate: formData.cancellationDate,
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

    try {
      await RegistrationService.createRegistration(newDataRegistration)
      .then(() => {
        setMessage("Turma criada com sucesso!");
        setTimeout(() => {
          navigate(`/admin/matriculas`);
        }, 2000);
      })
        setFormData({
            registrationStatus: "",
            registrationDate: "",
            cancellationDate: "",
            class: {
                id: "", 
                name: ""
                },
                user: {
                id: "", 
                name: ""
                },
                vindiPlanId: ""
            });

        setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao criar matrícula:", error);
      setMessageError("Erro ao criar matrícula.");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <>
      <form className="row g-3" style={{ marginLeft:'30px', marginRight:'30px', marginTop:'10px' }} onSubmit={handleSubmit}>
        <h2 className="mb-4">Criar Nova Matrícula</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="col-md-6">
          <label htmlFor="inputStatus" className='form-label'>Status</label>
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
        
        <div className="col-md-6">
          <label htmlFor="inputRegistrationDate" className='form-label'>Data de matrícula</label>
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
        <div className="col-md-6">
          <label htmlFor="inputCancellationDate" className='form-label'>Data de cancelamento</label>
          <input
            type="text"
            className="form-control"
            id="inputCancellationDate"
            value={formData.cancellationDate}
            onChange={handleChange}
            placeholder="DD-MM-AAAA (opcional)"
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="inputClass" className='form-label'>Turma</label>
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
        <div className="col-md-6">
          <label htmlFor="inputUser" className='form-label'>Aluno</label>
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
        
        <div className="col-md-6">
          <label htmlFor="inputVindiPlanId" className='form-label'>Plano Vindi</label>
          <input
            type="number"
            className="form-control"
            id="inputVindiPlanId"
            value={formData.vindiPlanId}
            onChange={handleChange}
            placeholder="ID do plano no Vindi"
          />
        </div>
        <div className="col-12 text-end mt-3">
        <Link to={`/admin/matriculas/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">
            Criar Matrícula
          </button>
        </div>
      </form>
    </>
  );
}

export default RegistrationCreateComponent;