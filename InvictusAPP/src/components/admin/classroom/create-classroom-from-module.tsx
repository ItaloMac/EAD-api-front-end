import {useEffect, useState} from "react";
import { ICreateClassroomService } from "../../../interfaces/admin/IClassroom";
import { ClassroomService } from "../../../Services/Admin/Classroom";
import { IGetModuleByIdService } from "../../../interfaces/admin/IModulesService";
import { ModuleService } from "../../../Services/Admin/ModuleService";
import formatDateWhileTyping from "../../../Utils/formatDateWhileTyping";
import { useNavigate } from "react-router";

function CreateClassroomFromModuleComponent({moduleId}: {moduleId: string}) {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [module, setModule] = useState<IGetModuleByIdService | null>(null);
    const [formData, setFormData] = useState({
        theme: "",
        startDate: "",
        classroom: "",
        moduloId: moduleId,
        videoUrl: ""
    });

    useEffect(() => {
        async function CarregarModulo() {
            try {
                const response = await ModuleService.getModuleById(moduleId);
                setModule(response);
            } catch (error) {
                console.error("Erro ao carregar módulo:", error);
            }
        }
        CarregarModulo();
    }, [moduleId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case "inputTheme":
                setFormData((prev) => ({
                    ...prev,
                    theme: value
                }));
                break;
            case "inputStartDate":
                setFormData((prev) => ({ ...prev, startDate: formatDateWhileTyping(value) }));
                break;
            case "inputClassroom":
                setFormData((prev) => ({
                    ...prev,
                    classroom: value
                }));
                break;
            default:
                break;
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newDataClassroom: ICreateClassroomService = {
            theme: formData.theme,
            startDate: formData.startDate,
            classroom: formData.classroom,
            moduloId: formData.moduloId,
            videoUrl: formData.videoUrl
        };
        
        try {
            await ClassroomService.createClassroomService(newDataClassroom);
            setMessage("Aula criada com sucesso.");
            setTimeout(() => {
                navigate(`/admin/modulu/${moduleId}/aulas`);
            }, 2000);
        } catch (error) {
            console.error("Erro ao criar aula:", error);
            setMessageError("Erro ao criar aula.");
        }
    };
    
    return (
        <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Criar Aula para o Módulo: {module?.theme}</h2>        
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputTheme" className="form-label">Tema da Aula</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTheme"
                        value={formData.theme}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputModule" className="form-label">Módulo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputModule"
                        value={module ? module.theme : 'Carregando...'}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputStartDate" className="form-label">Data de Início</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputStartDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder="DD-MM-AAAA"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputClassroom" className="form-label">Link da Aula (Google Meet, Zoom, etc.)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputClassroom"
                        value={formData.classroom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputVideoUrl" className="form-label">Link da aula gravada (opcional)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputVideoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Criar Aula</button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {messageError && <div className="alert alert-danger mt-3">{messageError}</div>}
        </div>
    );

}

export default CreateClassroomFromModuleComponent;