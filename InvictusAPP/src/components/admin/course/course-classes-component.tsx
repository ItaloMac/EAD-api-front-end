import { useState, useEffect } from 'react';
import { IGetClassesByCourseIDService } from '../../../interfaces/admin/ICourseService';
import { CourseService } from '../../../Services/Admin/CourseService';
import { Link } from 'react-router';
import './course-classes-component.css'
import { ClassService } from '../../../Services/Admin/ClassService';

function CourseClassesComponent({ id }: { id: string }){
    const [classData, setClassData] = useState<IGetClassesByCourseIDService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        async function fetchClasses() {
            if (id) {
                try {
                    setLoading(true);
                    const response = await CourseService.getClassesByIdCourse(id);
                    setClassData(response);
                } catch (error) {
                    console.error("Erro ao carregar turmas:", error);
                    setError("Erro ao carregar turmas do curso.");
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("O ID do curso não foi fornecido.");
                setError("ID do curso não fornecido.");
                setLoading(false);
            }
        }
        fetchClasses();
    }, [id]);

    const handleDelete = async () => {
        if (!selectedClassId) return;

        try {
            await ClassService.deleteClass(selectedClassId);
            setMessage("Turma removida com sucesso.");
            setShowModal(false);
            setClassData((prev) => prev.filter((cls) => cls.id !== selectedClassId));
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao remover turma:", error);
            setMessageError("Erro ao remover turma.");
            setTimeout(() => setMessageError(""), 3000);
        }
    };

    const turmasFiltradas = classData.filter((classItem) =>
        classItem.name.toLowerCase().includes(filtro.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    if (loading) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="text-center">Carregando turmas...</div>
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
                <h2 className="mb-4">Turmas do Curso</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {messageError && <div className="alert alert-danger">{messageError}</div>}
                
                <nav className="navbar custom-navbar">
                    <div className="div-form">
                        <form className="d-flex custom-form-users" role="search">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Pesquisar por nome da turma" 
                                aria-label="Search"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </nav>
                
                <div>
                    <Link to={`/admin/curso/${id}/adicionar-turma`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Nova turma">Adicionar turma</Link>
                </div>
                
                <div className="table-responsive">
                    <table className="table align-middle table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Nome</th>
                                <th>Data de Início</th>
                                <th>Data de Fim</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center">Nenhuma turma encontrada para este curso.</td>
                                </tr>
                            ) : (
                                turmasFiltradas.map((classItem) => (
                                    <tr key={classItem.id}>
                                        <td>{classItem.name}</td>
                                        <td>{formatDate(classItem.startDate)}</td>
                                        <td>{formatDate(classItem.endDate)}</td>
                                        <td className="text-center">
                                            <Link 
                                                to={`/admin/turma/${classItem.id}`} 
                                                className="bi bi-eye-fill mx-2 text-dark" 
                                                title="Ver turma"
                                            ></Link>
                                            <Link 
                                                to={`/admin/turma/matriculas/${classItem.id}`} 
                                                className=" bi-clipboard2 me-2 text-dark" 
                                                style={{ marginLeft: "8px" }} 
                                                title="Matrículas da turma"
                                            ></Link>
                                            <button 
                                                onClick={() => {
                                                    setSelectedClassId(classItem.id);
                                                    setShowModal(true);
                                                }}
                                                className="bi bi-trash-fill text-danger btn-link"
                                                style={{ marginLeft: "8px" }} 
                                                title="Remover turma"
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
                        <h4>Tem certeza que deseja remover esta turma?</h4>
                        <p>Esta ação não pode ser desfeita.</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="btn btn-danger">
                                Remover Turma
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
export default CourseClassesComponent;