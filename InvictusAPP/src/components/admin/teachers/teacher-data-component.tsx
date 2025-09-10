import { useEffect, useState } from "react";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { uploadImageToCloudinary } from "../../../Services/UploadImageService";
import { Link } from "react-router";
import "./teacher-data-component.css";

function TeacherDataComponent({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    miniResume: "",
    imagemUrl: ""
  });

  useEffect(() => {
    async function CarregarDadosProfessor() {
      setLoading(true);
      
      try {
        const professorResponse = await TeachersService.getTeacherByIdService(id);

        setFormData({
          id: professorResponse.id,
          name: professorResponse.name,
          miniResume: professorResponse.miniResume,
          imagemUrl: professorResponse.imagemUrl
        });

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setMessageError("Erro ao carregar dados do professor.");
      } finally {
        setLoading(false);
      }
    }

    CarregarDadosProfessor();
  }, [id]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTeacherData = {
      name: formData.name,
      miniResume: formData.miniResume,
      imagemUrl: formData.imagemUrl
    };

    TeachersService.updateTeacherByIdService(id, updatedTeacherData)
      .then(() => {
        setMessage("Dados atualizados com sucesso!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar dados do professor:", error);
        setMessageError("Erro ao atualizar dados do professor. Confira se todos os campos estão corretos.");
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
        <p>Carregando dados do professor...</p>
      </div>
    );
  }

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados do Professor</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        {/* Imagem do professor */}
        <div className="">
          {formData.imagemUrl && (
            <img
              src={formData.imagemUrl}
              alt="Foto do Professor"
              className="teacher-profile-image"
            />
          )}
        </div>
        
        {/* Todos os inputs em uma única coluna */}
        <div className="">
          <label htmlFor="inputImagemFile">Upload de Imagem</label>
          <input
            type="file"
            className="form-control"
            id="inputImagemFile"
            onChange={handleFileUpload}
            accept="image/*"
          />
        </div>
        
        <div className="">
          <label htmlFor="inputImagemUrl">URL da Imagem</label>
          <input
            type="url"
            className="form-control"
            id="inputImagemUrl"
            value={formData.imagemUrl}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        
        <div className="">
          <label htmlFor="inputName">Nome</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do professor"
          />
        </div>
        
        <div className="">
          <label htmlFor="inputMiniResume">Mini Currículo</label>
          <textarea
            required
            className="form-control"
            id="inputMiniResume"
            value={formData.miniResume}
            onChange={handleChange}
            placeholder="Breve descrição sobre o professor..."
            rows={4}
          />
        </div>
        
        <div className=" text-end mt-3">
          <Link 
            to="/admin/professores" 
            className="btn btn-outline-secondary" 
            style={{marginRight:'5px'}} 
            title="cancelar"
          >
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </>
  );
}

export default TeacherDataComponent;
