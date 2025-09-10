import { useState } from "react";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { ICreateTeacherService } from "../../../interfaces/admin/ITeachersSerivce";
import "./create-teacher-component.css";
import { uploadImageToCloudinary } from "../../../Services/UploadImageService";
import { Link } from "react-router";

function CreateTeacherComponent() {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    miniResume: "",
    imagemUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "inputName":
        setFormData((prev) => ({ ...prev, name: value }));
        break;
      case "inputMiniResume":
        setFormData((prev) => ({ ...prev, miniResume: value }));
        break;
      case "inputImageUrl":
        setFormData((prev) => ({ ...prev, imagemUrl: value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTeacherData: ICreateTeacherService = {
      name: formData.name,
      miniResume: formData.miniResume,
      imagemUrl: formData.imagemUrl
    };

    try {
      await TeachersService.createTeacherService(newTeacherData);
      setMessage("Professor criado com sucesso!");
      
      // Limpar formulário
      setFormData({
        name: "",
        miniResume: "",
        imagemUrl: ""
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar professor:", error);
      setMessageError("Erro ao criar professor. Confira se todos os campos estão corretos.");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imagemUrl = await uploadImageToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        imagemUrl: imagemUrl,
      }));

      console.log("Imagem enviada com sucesso:", imagemUrl);
    } catch (error) {
      console.error("Falha ao enviar imagem", error);
      setMessageError("Erro ao fazer upload da imagem.");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  return (
    <>
      <form className="row g-3 teacher-create-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Criar Novo Professor</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="profile-upload-wrapper mb-4">
          {formData.imagemUrl && (
            <img
              src={formData.imagemUrl}
              alt="Foto do Professor"
              style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div className="form-group-custom mt-2" style={{ maxWidth: "300px" }}>
            <label htmlFor="inputImagemFile">Upload de Imagem</label>
            <input
              type="file"
              className="form-control"
              id="inputImagemFile"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>
        </div>

        <div className="form-group-custom">
          <label htmlFor="inputImageUrl">URL da Imagem</label>
          <input
            type="url"
            className="form-control"
            id="inputImagemUrl"
            value={formData.imagemUrl}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          <small className="text-muted">Você pode fazer upload de uma imagem acima ou inserir uma URL diretamente</small>
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">Nome do Professor</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputMiniResume" className="form-label">Mini Currículo</label>
          <textarea
            className="form-control"
            id="inputMiniResume"
            value={formData.miniResume}
            onChange={handleChange}
            rows={6}
            placeholder="Descreva brevemente a experiência e qualificações do professor..."
            required
          />
        </div>

        <div className="col-12 text-end mt-3">
          <Link to={`/admin/professores/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Criar Professor</button>
        </div>
      </form>
    </>
  );
}

export default CreateTeacherComponent;
