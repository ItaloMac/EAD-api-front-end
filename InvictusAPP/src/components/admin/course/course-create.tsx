/* filepath: /home/italo/Invictus Project/web-app/InvictusAPP/src/components/admin/course/course-create.tsx */
import { useEffect, useState } from "react";
import { CourseService } from "../../../Services/Admin/CourseService";
import { TeachersService } from "../../../Services/Admin/TeachersService";
import { ICreateCourseService } from "../../../interfaces/admin/ICourseService";
import "./course-create.css";
import { uploadImageToCloudinary } from "../../../Services/UploadImageService";
import { Link } from "react-router";

function CourseCreateComponent() {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [coordenadores, setCoordenadores] = useState<{ id: string; name: string }[]>([]);
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
    async function CarregarCoordenadores() {
      try {
        const response = await TeachersService.getTeacherListService();
        setCoordenadores(response);
      } catch (error) {
        console.error("Erro ao carregar coordenadores:", error);
      }
    }

    CarregarCoordenadores();
  }, []);

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

    const newCourseData: ICreateCourseService = {
      status: formData.status,
      name: formData.name,
      type: formData.type,
      presentation: formData.presentation,
      startForecast: formData.startForecast,
      modality: formData.modality,
      location: formData.location,
      workload: formData.workload,
      duration: formData.duration,
      proposal: formData.proposal,
      requirements: formData.requirements,
      documentation: formData.documentation,
      curriculum: formData.curriculum,
      registrationPrice: formData.registrationPrice,
      monthlyPrice: formData.monthlyPrice,
      totalPrice: formData.totalPrice,
      installments: formData.installments,
      cashPrice: formData.cashPrice,
      fullPrice: formData.fullPrice,
      discount: formData.discount,
      imagemUrl: formData.imagemUrl,
      coordenadorId: formData.coordenadorId
    };

    try {
      await CourseService.createCourse(newCourseData);
      setMessage("Curso criado com sucesso!");
      
      // Limpar formulário
      setFormData({
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

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      setMessageError("Erro ao criar curso. Confira se todos os campos estão corretos.");
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
      <form className="row g-3 course-create-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Criar Novo Curso</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {messageError && <div className="alert alert-danger">{messageError}</div>}
        
        <div className="course-image-wrapper">
          <img
            src={formData.imagemUrl || "/placeholder-course.jpg"}
            alt="Imagem do Curso"
            style={{ width: 200, height: 150, borderRadius: "8px", objectFit: "cover" }}
          />
          <div className="mt-2" style={{ maxWidth: "300px" }}>
            <label htmlFor="inputImagemUrl" className="form-label">Imagem do Curso</label>
            <input
              type="file"
              className="form-control"
              id="inputImagemUrl"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        
        <div className="">
          <div className="form-check">
            <input
              className="form-check-input checkbox-status-course"
              type="checkbox"
              id="inputStatus"
              checked={formData.status}
              onChange={handleChange}
            />
            <label className="form-check-label label-status" htmlFor="inputStatus">
              Curso Ativo
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">Nome do Curso</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputType" className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            id="inputType"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputModality" className="form-label">Modalidade</label>
          <input
            type="text"
            className="form-control"
            id="inputModality"
            value={formData.modality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputLocation" className="form-label">Local</label>
          <input
            type="text"
            className="form-control"
            id="inputLocation"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputDuration" className="form-label">Duração</label>
          <input
            type="text"
            className="form-control"
            id="inputDuration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputWorkload" className="form-label">Carga Horária</label>
          <input
            type="text"
            className="form-control"
            id="inputWorkload"
            value={formData.workload}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputStartForecast" className="form-label">Previsão de Início</label>
          <input
            type="text"
            className="form-control"
            id="inputStartForecast"
            value={formData.startForecast}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCurriculum" className="form-label">Currículo</label>
          <input
            type="text"
            className="form-control"
            id="inputCurriculum"
            value={formData.curriculum}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputRegistrationPrice" className="form-label">Preço de Matrícula</label>
          <input
            type="text"
            className="form-control"
            id="inputRegistrationPrice"
            value={formData.registrationPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputMonthlyPrice" className="form-label">Preço Mensal</label>
          <input
            type="number"
            className="form-control"
            id="inputMonthlyPrice"
            value={formData.monthlyPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputTotalPrice" className="form-label">Preço Total</label>
          <input
            type="number"
            className="form-control"
            id="inputTotalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputInstallments" className="form-label">Parcelas</label>
          <input
            type="number"
            className="form-control"
            id="inputInstallments"
            value={formData.installments}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCashPrice" className="form-label">Preço à Vista</label>
          <input
            type="number"
            className="form-control"
            id="inputCashPrice"
            value={formData.cashPrice}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputDiscount" className="form-label">Desconto</label>
          <input
            type="text"
            className="form-control"
            id="inputDiscount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCoordenadorId" className="form-label">Coordenador</label>
          <select
            className="form-select"
            id="inputCoordenadorId"
            value={formData.coordenadorId}
            onChange={handleChange}
          >
            <option value="">Selecione um coordenador</option>
            {coordenadores.map((coordenador) => (
              <option key={coordenador.id} value={coordenador.id}>
                {coordenador.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="inputPresentation" className="form-label">Apresentação</label>
          <textarea
            className="form-control"
            id="inputPresentation"
            value={formData.presentation}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputProposal" className="form-label">Proposta</label>
          <textarea
            className="form-control"
            id="inputProposal"
            value={formData.proposal}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputRequirements" className="form-label">Requisitos</label>
          <textarea
            className="form-control"
            id="inputRequirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputDocumentation" className="form-label">Documentação</label>
          <textarea
            className="form-control"
            id="inputDocumentation"
            value={formData.documentation}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="col-12 text-end mt-3">
          <Link to={`/admin/cursos/`} className="btn btn-outline-secondary" style={{marginRight:'5px'}} title="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-primary">Criar Curso</button>
        </div>
      </form>
    </>
  );
}

export default CourseCreateComponent;