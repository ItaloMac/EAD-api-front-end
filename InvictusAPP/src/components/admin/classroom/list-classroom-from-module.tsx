import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IClassroomresponse } from "../../../interfaces/admin/IClassroom";
import { ClassroomService } from "../../../Services/Admin/Classroom";
import "./list-classroom-from-module.css";

function ListClassroomFromModuleComponent({moduleId}: {moduleId: string}) {
    const [classrooms, setClassrooms] = useState<IClassroomresponse[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");   

    useEffect(() => {
        async function CarregarClassrooms() {
            try {
                const response = await ClassroomService.getAllClassrooms();
                const filteredClassrooms = response.filter(classroom => classroom.moduloId === moduleId);
                setClassrooms(filteredClassrooms);
            } catch (error) {
                console.error("Erro ao carregar classrooms:", error);
            }
        }
        CarregarClassrooms();
    }, [moduleId]);

    const classroomsFiltradas = classrooms.filter((classroom) =>
        `${classroom.theme} ${classroom.theme}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    const handleDelete = async () => {
        if (!selectedClassroomId) return;
    
        try {
          await ClassroomService.deleteClassroomService(selectedClassroomId);
          setMessage("Turma deletada com sucesso.");
          setShowModal(false);
          setClassrooms((prev) => prev.filter((classroomItem) => classroomItem.id !== selectedClassroomId));
        } catch (error) {
          console.error("Erro ao deletar a turma:", error);
          setMessageError("Erro ao deletar turma.");
        }
      };

    return (
        <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Aulas do Módulo</h2>
    
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar por tema da aula"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>
            <div>
                <Link to={`/admin/modulo/${moduleId}/criar-aula`} className="btn btn-primary mb-3" title="Criar Aula">Criar Aula</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tema da Aula</th>
                        <th>Data de Início</th>
                        <th>Link da aula ao vivo</th>
                        <th>Aula gravada</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {classroomsFiltradas.map((classroom) => (
                        <tr key={classroom.id}>
                            <td>{classroom.theme}</td>
                            <td>{classroom.startDate}</td>
                            <td>
                                <a href={classroom.classroom} className="text-primary" target="_blank" rel="noopener noreferrer">
                                    Link da Aula
                                </a>
                            </td>
                            <td>
                                <a href={classroom.videoUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                                    Link do Vídeo
                                </a>
                            </td>
                            <td>
                                <Link to={`/admin/modulo/${moduleId}/atualizar-aula/${classroom.id}`} className="btn btn-primary btn-sm me-2">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => {
                                    setSelectedClassroomId(classroom.id);
                                    setShowModal(true);
                                    }}
                                    className="btn btn-danger btn-sm"
                                    title="Excluir turma"
                                >Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
               
            </table>
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Tem certeza que deseja deletar esta aula?</h4>
                    <div className="modal-buttons">
                    <button onClick={handleDelete} className="btn btn-danger">
                        Deletar aula
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-secondary"
                    >
                        Cancelar
                    </button>
                    </div>
                </div>
                </div>
            )}

            {/* Mensagens de sucesso ou erro */}
            {message && <p className="success-message">{message}</p>}
            {messageError && <p className="error-message">{messageError}</p>}
        </div>
        
    );
}

export { ListClassroomFromModuleComponent

}
