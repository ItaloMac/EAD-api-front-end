import { useState, useEffect } from 'react';
import { ModuleService } from '../../../Services/Admin/ModuleService';
import { IModuloService } from '../../../interfaces/IModuloService';
import { Link } from 'react-router';
import './course-modules-component.css';

function CourseModulesComponent({ courseId }: { courseId: string }) {
    const [modules, setModules] = useState<IModuloService[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchModules() {
            if (courseId) {
                try {
                    setLoading(true);
                    const allModules = await ModuleService.getAllModules();
                    
                    console.log("Todos os módulos:", allModules);
                    console.log("Course ID:", courseId);
                    
                    // Filtrar módulos que pertencem ao curso
                    const courseModules = allModules.filter(module => module.curso.id === courseId);
                    console.log("Módulos filtrados:", courseModules);
                    
                    setModules(courseModules);
                } catch (error) {
                    console.error("Erro ao carregar módulos:", error);
                    setMessageError("Erro ao carregar módulos do curso.");
                    setTimeout(() => setMessageError(""), 3000);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("O ID do curso não foi fornecido.");
                setMessageError("ID do curso não fornecido.");
                setTimeout(() => setMessageError(""), 3000);
                setLoading(false);
            }
        }
        fetchModules();
    }, [courseId]);

    const handleDeleteModule = async () => {
        if (!selectedModuleId) return;

        try {
            await ModuleService.deleteModule(selectedModuleId);
            setMessage("Módulo removido com sucesso!");
            setShowModal(false);
            setModules((prev) => prev.filter((module) => module.id !== selectedModuleId));
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao remover módulo:", error);
            setMessageError("Erro ao remover módulo do curso.");
            setTimeout(() => setMessageError(""), 3000);
        }
    };

    const modulosFiltrados = modules.filter((module) =>
        module.theme.toLowerCase().includes(filtro.toLowerCase()) ||
        module.description.toLowerCase().includes(filtro.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="text-center">Carregando módulos...</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-grow-1 px-4">
                <h2 className="mb-4">Módulos do Curso</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {messageError && <div className="alert alert-danger">{messageError}</div>}
                
                <nav className="navbar custom-navbar">
                    <div className="div-form">
                        <form className="d-flex custom-form-users" role="search">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Pesquisar por tema ou descrição" 
                                aria-label="Search"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </nav>
                
                <div>
                    <Link to={`/admin/curso/${courseId}/adicionar-modulo`} className="btn btn-primary" style={{ marginBottom: "20px" }} title="Adicionar módulo">Adicionar Módulo</Link>
                </div>
                
                <div className="table-responsive">
                    <table className="table align-middle table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Tema</th>
                                <th>Descrição</th>
                                <th>Data Início</th>
                                <th>Data Fim</th>
                                <th>Carga Horária</th>
                                <th>Professor</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modules.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">Nenhum módulo encontrado para este curso.</td>
                                </tr>
                            ) : (
                                modulosFiltrados.map((module) => (
                                    <tr key={module.id}>
                                        <td>{module.theme}</td>
                                        <td>
                                            <div className="module-description">
                                                {module.description.length > 80 
                                                    ? `${module.description.substring(0, 80)}...`
                                                    : module.description
                                                }
                                            </div>
                                        </td>
                                        <td>{module.startDate}</td>
                                        <td>{module.endDate}</td>
                                        <td>{module.workload}</td>
                                        <td>{module.professor.name}</td>
                                        <td className="text-center">
                                            <Link 
                                                to={`/admin/modulo/${module.id}`} 
                                                className="bi bi-eye-fill mx-2 text-black" 
                                                title="Detalhes do módulo"
                                            ></Link>
                    
                                            <Link 
                                                to={`/admin/modulo/${module.id}/aulas`} 
                                                className="bi bi-play-btn-fill text-black mx-2" 
                                                title="Aulas do módulo"
                                            ></Link>
                                            <button 
                                                onClick={() => {
                                                    setSelectedModuleId(module.id);
                                                    setShowModal(true);
                                                }}
                                                className="bi bi-trash-fill text-danger btn-link"
                                                style={{ marginLeft: "8px" }} 
                                                title="Remover módulo"
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
                        <h4>Tem certeza que deseja remover este módulo do curso?</h4>
                        <p>Esta ação removerá o módulo apenas deste curso específico.</p>
                        <div className="modal-buttons">
                            <button onClick={handleDeleteModule} className="btn btn-danger">
                                Remover Módulo
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

export default CourseModulesComponent;
