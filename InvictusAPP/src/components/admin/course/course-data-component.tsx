import { useEffect, useState } from "react";
import { CourseService } from "../../../Services/Admin/CourseService";
import "./course-data-component.css";
import { uploadImageToCloudinary } from "../../../Services/UploadImageService";
import { Link } from "react-router";

function CourseDataComponent({ courseId }: { courseId: string }) {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    presentation: "",
    startForecast: "",
    modality: "",
    location: "",
    workload: "",
    duration: "",
    proposal: "",
    requirements: "",
    documentation: "",
    curriculum: "",
    registrationPrice: "",
    monthlyPrice: 0,
    totalPrice: 0,
    installments: 0,
    cashPrice: 0,
    fullPrice: 0,
    discount: "",
    imagemUrl: "",
    status: true,
    coordenadorId: ""
  });

  useEffect(() => {
    async function CarregarDadosCurso() {
      try {
        const response = await CourseService.getCourseById(courseId);
        setFormData({
          name: response.name || "",
          type: response.type || "",
          presentation: response.presentation || "",
          startForecast: response.startForecast || "",
          modality: response.modality || "",
          location: response.location || "",
          workload: response.workload || "",
          duration: response.duration || "",
          proposal: response.proposal || "",
          requirements: response.requirements || "",
          documentation: response.documentation || "",
          curriculum: response.curriculum || "",
          registrationPrice: response.registrationPrice || "",
          monthlyPrice: response.monthlyPrice || 0,
          totalPrice: response.totalPrice || 0,
          installments: response.installments || 0,
          cashPrice: response.cashPrice || 0,
          fullPrice: response.fullPrice || 0,
          discount: response.discount || "",
          imagemUrl: response.imagemUrl || "",
          status: response.status,
          coordenadorId: response.coordenador?.id || ""
        });
      } catch (error) {
        console.error("Erro ao carregar dados do curso:", error);
        setMessageError("Erro ao carregar dados do curso.");
      }
    }

    CarregarDadosCurso();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const key = id.replace("input", "").charAt(0).toLowerCase() + id.replace("input", "").slice(1);
    
    setFormData((prev) => ({
      ...prev,
      [key]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await CourseService.updateCourseById(courseId, formData);
      setMessage("Dados do curso atualizados com sucesso!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar dados do curso:", error);
      setMessageError("Erro ao atualizar dados do curso. Confira se todos os campos estão corretos.");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        imagemUrl: imageUrl,
      }));
      console.log("Imagem enviada com sucesso:", imageUrl);
    } catch (error) {
      console.error("Falha ao enviar imagem", error);
    }
  };

  return (
    <>
      <form className="row custom-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Dados do Curso</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="course-image-wrapper mb-4">
          <img
            src={formData.imagemUrl || "/placeholder-course.jpg"}
            alt="Imagem do Curso"
            style={{ width: 200, height: 150, borderRadius: "8px", objectFit: "cover" }}
          />
          <div className="form-group-custom mt-2" style={{ maxWidth: "300px" }}>
            <label htmlFor="inputImagemUrl">Imagem do Curso</label>
            <input
              type="file"
              className="form-control"
              id="inputImagemUrl"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputName">Nome do Curso</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputType">Tipo</label>
          <input
            type="text"
            className="form-control"
            id="inputType"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputModality">Modalidade</label>
          <input
            type="text"
            className="form-control"
            id="inputModality"
            value={formData.modality}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputLocation">Local</label>
          <input
            type="text"
            className="form-control"
            id="inputLocation"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputDuration">Duração</label>
          <input
            type="text"
            className="form-control"
            id="inputDuration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputWorkload">Carga Horária</label>
          <input
            type="text"
            className="form-control"
            id="inputWorkload"
            value={formData.workload}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputStartForecast">Previsão de Início</label>
          <input
            type="text"
            className="form-control"
            id="inputStartForecast"
            value={formData.startForecast}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputFaculty">Faculdade</label>
          <input
            type="text"
            className="form-control"
            id="inputFaculty"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputRegistrationPrice">Preço de Matrícula</label>
          <input
            type="text"
            className="form-control"
            id="inputRegistrationPrice"
            value={formData.registrationPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputMonthlyPrice">Preço Mensal</label>
          <input
            type="number"
            className="form-control"
            id="inputMonthlyPrice"
            value={formData.monthlyPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputTotalPrice">Preço Total</label>
          <input
            type="number"
            className="form-control"
            id="inputTotalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputInstallments">Parcelas</label>
          <input
            type="number"
            className="form-control"
            id="inputInstallments"
            value={formData.installments}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputCashPrice">Preço à Vista</label>
          <input
            type="number"
            className="form-control"
            id="inputCashPrice"
            value={formData.cashPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <label htmlFor="inputDiscount">Desconto</label>
          <input
            type="text"
            className="form-control"
            id="inputDiscount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 form-group-custom full-width">
          <label htmlFor="inputPresentation">Apresentação</label>
          <textarea
            className="form-control"
            id="inputPresentation"
            value={formData.presentation}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12 form-group-custom full-width">
          <label htmlFor="inputProposal">Proposta</label>
          <textarea
            className="form-control"
            id="inputProposal"
            value={formData.proposal}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12 form-group-custom full-width">
          <label htmlFor="inputRequirements">Requisitos</label>
          <textarea
            className="form-control"
            id="inputRequirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12 form-group-custom full-width">
          <label htmlFor="inputDocumentation">Documentação</label>
          <textarea
            className="form-control"
            id="inputDocumentation"
            value={formData.documentation}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12 form-group-custom full-width">
          <label htmlFor="inputCurriculum">Currículo</label>
          <textarea
            className="form-control"
            id="inputCurriculum"
            value={formData.curriculum}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-md-6 form-group-custom">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="inputStatus"
              checked={formData.status}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inputStatus">
              Curso Ativo
            </label>
          </div>
        </div>

        <div className="col-12 text-end mt-3">
          <Link to={`/admin/cursos/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Salvar alterações</button>
        </div>
      </form>
    </>
  );
}

export default CourseDataComponent;
