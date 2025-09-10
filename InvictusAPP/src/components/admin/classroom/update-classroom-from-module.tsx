import {useEffect, useState} from "react";
import { IUpdateClassroomService } from "../../../interfaces/admin/IClassroom";
import { ClassroomService } from "../../../Services/Admin/Classroom";
import { IGetModuleByIdService } from "../../../interfaces/admin/IModulesService";
import { ModuleService } from "../../../Services/Admin/ModuleService";
import formatDateWhileTyping from "../../../Utils/formatDateWhileTyping";
function UpdateClassroomFromModuleComponent({classroomId, moduleId}: {classroomId: string, moduleId: string}) {
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(true);
    const [module, setModule] = useState<IGetModuleByIdService | null>(null);
    const [formData, setFormData] = useState({
        theme: "",
        startDate: "",
        classroom: "",
        moduloId: moduleId,
        videoUrl: ""
    });

    useEffect(() => {
        async function CarregarDados() {
            setLoading(true);
            try {
                const [classroomResponse, moduleResponse] = await Promise.all([
                    ClassroomService.getClassroomByIdService(classroomId),
                    ModuleService.getModuleById(moduleId)
                ]);

                setModule(moduleResponse);
                setFormData({
                    theme: classroomResponse.theme || "",
                    startDate: classroomResponse.startDate,
                    classroom: classroomResponse.classroom || "",
                    moduloId: moduleId,
                    videoUrl: classroomResponse.videoUrl || ""
                });
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setMessageError("Erro ao carregar dados da aula.");
            } finally {
                setLoading(false);
            }
        }
        CarregarDados();
    }, [classroomId, moduleId]);

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
            case "inputVideoUrl":
                setFormData((prev) => ({
                    ...prev,
                    videoUrl: value
                }));
                break;
            default:
                break;
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateDataClassroom: IUpdateClassroomService = {
            id: classroomId,
            theme: formData.theme,
            startDate: formData.startDate,
            classroom: formData.classroom,
            moduloId: formData.moduloId,
            videoUrl: formData.videoUrl
        };
        
        try {
            await ClassroomService.updateClassroomService(updateDataClassroom);
            setMessage("Aula atualizada com sucesso.");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.error("Erro ao atualizar aula:", error);
            setMessageError("Erro ao atualizar aula.");
            setTimeout(() => {
                setMessageError("");
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Carregando dados da aula...</p>
            </div>
        );
    }
    
    return (
        <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Editar Aula do Módulo: {module?.theme}</h2>        
            <form onSubmit={handleSubmit}>
                {message && <div className="alert alert-success">{message}</div>}
                {messageError && <div className="alert alert-danger">{messageError}</div>}
                
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
                
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default UpdateClassroomFromModuleComponent;
