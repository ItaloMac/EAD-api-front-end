import { useState, useEffect } from 'react';
import { IGetTeachersByIdCourseService } from '../../../interfaces/admin/ICourseService';
import { CourseService } from '../../../Services/Admin/CourseService';
import { Link } from 'react-router';
import './course-teachers-component.css';

function CourseTeachersComponent({ courseId }: { courseId: string }) {
    const [teachers, setTeachers] = useState<IGetTeachersByIdCourseService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        async function fetchTeachers() {
            if (courseId) {
                try {
                    setLoading(true);
                    const response = await CourseService.getTeachersByIdCourse(courseId);
                    setTeachers(response);
                } catch (error) {
                    console.error("Erro ao carregar professores:", error);
                    setError("Erro ao carregar professores do curso.");
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("O ID do curso não foi fornecido.");
                setError("ID do curso não fornecido.");
                setLoading(false);
            }
        }
        fetchTeachers();
    }, [courseId]);

    const handleDelete = async () => {
        if (!selectedTeacherId) return;

        try {
            await CourseService.removeTeacherFromCourse(courseId, selectedTeacherId);
            setMessage("Professor removido do curso com sucesso.");
            setShowModal(false);
            setTeachers((prev) => prev.filter((teacher) => teacher.id !== selectedTeacherId));
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao remover professor:", error);
            setMessageError("Erro ao remover professor do curso.");
            setTimeout(() => setMessageError(""), 3000);
        }
    };

    const professoresFiltrados = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(filtro.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="text-center">Carregando professores...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-grow-1 px-4">
                <h2 className="mb-4">Professores do Curso</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {messageError && <div className="alert alert-danger">{messageError}</div>}
                
                <nav className="navbar custom-navbar">
                    <div className="div-form">
                        <form className="d-flex custom-form-users" role="search">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Pesquisar por nome do professor" 
                                aria-label="Search"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </nav>
                
                <div>
                    <Link to={`/admin/curso/${courseId}/adicionar-professor`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Adicionar professor">Adicionar Professor</Link>
                </div>
                
                <div className="table-responsive">
                    <table className="table align-middle table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Nome</th>
                                <th>Mini Currículo</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center">Nenhum professor encontrado para este curso.</td>
                                </tr>
                            ) : (
                                professoresFiltrados.map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td>{teacher.name}</td>
                                        <td>
                                            <div className="mini-resume">
                                                {teacher.miniResume.length > 100 
                                                    ? `${teacher.miniResume.substring(0, 100)}...`
                                                    : teacher.miniResume
                                                }
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Link 
                                                to={`/admin/professor/${teacher.id}/`} 
                                                className="bi bi-eye-fill mx-2 text-dark" 
                                                title="Dados do professor"
                                            ></Link>
                                    
                                            <button 
                                                onClick={() => {
                                                    setSelectedTeacherId(teacher.id);
                                                    setShowModal(true);
                                                }}
                                                className="bi bi-trash-fill text-danger btn-link"
                                                style={{ marginLeft: "8px" }} 
                                                title="Remover professor do curso"
                                            ></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Confirmação */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Tem certeza que deseja remover este professor do curso?</h4>
                        <p>Esta ação removerá o professor apenas deste curso específico.</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="btn btn-danger">
                                Remover Professor
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
        </>
    );
}

export default CourseTeachersComponent;
