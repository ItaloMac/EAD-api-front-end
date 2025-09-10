import { useEffect, useState } from "react";
import { UsersService } from "../../../Services/Admin/UsersService";
import "../users/user-data.css";
import { uploadImageToCloudinary } from "../../../Services/UploadImageService";
import { Link } from "react-router";

function UserDataCompenent({ userId }: { userId: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    cpf: "",
    birthDate: "",
    userType: 1,
    profilePhoto: "",
    CustomerId: ""
  });

  useEffect(() => {
    async function CarregarDadosUsuario() {
      try {
        const response = await UsersService.getUserById(userId);
        setFormData({
          name: response.name || "",
          lastName: response.lastName || "",
          email: response.email || "",
          cpf: response.cpf || "",
          birthDate: response.birthDate || "",
          userType: response.userType,
          profilePhoto: response.profilePhoto || "",
          CustomerId: response.CustomerId || ""
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    CarregarDadosUsuario();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  
    const key = id.replace("input", "").charAt(0).toLowerCase() + id.replace("input", "").slice(1);
  
    setFormData((prev) => ({
      ...prev,
      [key]: key === "birthDate"
        ? formatDateWhileTyping(value)
        : key === "userType"
        ? Number(value) // Converte para número aqui
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newData = {
      id: userId, // Adiciona o ID do usuário
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      cpf: formData.cpf,
      birthDate: formData.birthDate,
      userType: formData.userType,
      profilePhoto: formData.profilePhoto, // Adicione um valor padrão ou recupere o valor existente
      CustomerId: "" // Adicione um valor padrão ou recupere o valor existente
    };

    UsersService.updateUser(userId, newData)
      .then(() => {
        setMessage("Dados atualizados com sucesso!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar dados do usuário:", error);
        setMessageError("Erro ao atualizar dados do usuário. Confira se todos os campos estão corretos.");
        setTimeout(() => {
          setMessageError("");
        }, 3000);
      });
  };

  // Função para formatar a data enquanto o usuário digita
  function formatDateWhileTyping(value: string): string {
    // Remove qualquer caractere que não seja número
    const numericValue = value.replace(/\D/g, "");

    // Adiciona os separadores "-" conforme o usuário digita
    if (numericValue.length <= 2) {
      return numericValue; // Retorna apenas o dia
    } else if (numericValue.length <= 4) {
      return `${numericValue.slice(0, 2)}-${numericValue.slice(2)}`; // Retorna dia-mês
    } else {
      return `${numericValue.slice(0, 2)}-${numericValue.slice(2, 4)}-${numericValue.slice(4, 8)}`; // Retorna dia-mês-ano
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    try {
      const imageUrl = await uploadImageToCloudinary(file);
  
      setFormData((prev) => ({
        ...prev,
        profilePhoto: imageUrl,
      }));
  
      console.log("Imagem enviada com sucesso:", imageUrl);
    } catch (error) {
      console.error("Falha ao enviar imagem", error);
    }
  };

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados do aluno</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        <div className="profile-upload-wrapper mb-4">
          <img
            src={formData.profilePhoto}
            alt="Foto de Perfil"
            style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover" }}
          />
          <div className="form-group-custom mt-2" style={{ maxWidth: "300px" }}>
            <label htmlFor="inputProfilePhoto">Foto de Perfil</label>
            <input
              type="file"
              className="form-control"
              id="inputProfilePhoto"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputName">Nome</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputLastName">Sobrenome</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputCpf">CPF</label>
          <input
            type="text"
            className="form-control"
            id="inputCpf"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputBirthDate">Data de Nascimento</label>
          <input
            type="text"
            className="form-control"
            id="inputBirthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputUserType">Tipo de Usuário</label>
          <input
            type="number"
            className="form-control"
            id="inputUserType"
            value={formData.userType}
            onChange={handleChange}
            placeholder="1 para Aluno, 2 para Administrador"
          />
          <p className="text-muted small mt-2">Selecione 1 para aluno e 2 para Administrador</p>

        </div>
        <div className="col-12 text-end mt-3">
        <Link to={`/admin/usuarios/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Salvar alterações</button>
        </div>
      </form>
    </>
  );
}

export default UserDataCompenent;