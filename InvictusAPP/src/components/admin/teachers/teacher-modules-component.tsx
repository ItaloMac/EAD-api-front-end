import { useState, useEffect } from 'react';
import { IGetModulesByIdTeacherService } from '../../../interfaces/admin/ITeachersSerivce';
import { TeachersService } from '../../../Services/Admin/TeachersService';
import './teacher-modules-componentes.css';

function TeacherModulesComponent({ teacherId }: { teacherId: string }) {
    const [modules, setModules] = useState<IGetModulesByIdTeacherService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        async function fetchModules() {
            if (teacherId) {
                try {
                    setLoading(true);
                    console.log("Buscando módulos para o professor ID:", teacherId);
                    const response = await TeachersService.getModulesByIdTeacherService(teacherId);
                    console.log("Resposta da API:", response);
                    setModules(response);
                } catch (error) {
                    console.error("Erro ao carregar módulos:", error);
                    setError("Erro ao carregar módulos do professor.");
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("O ID do professor não foi fornecido.");
                setError("ID do professor não fornecido.");
                setLoading(false);
            }
        }
        fetchModules();
    }, [teacherId]);

    const modulosFiltrados = modules.filter((module) =>
        module.theme.toLowerCase().includes(filtro.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-grow-1 px-4">
                <div className="text-center">Carregando módulos...</div>
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
        <div className="flex-grow-1 px-4">
            <h2 className="mb-4">Módulos do Professor</h2>
            
            <nav className="navbar custom-navbar">
                <div className="div-form">
                    <form className="d-flex custom-form-users" role="search">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Pesquisar por tema do módulo" 
                            aria-label="Search"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </form>
                </div>
            </nav>
            
            <div className="table-responsive">
                <table className="table align-middle table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Tema</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center">Nenhum módulo encontrado para este professor.</td>
                            </tr>
                        ) : (
                            modulosFiltrados.map((module) => (
                                <tr key={module.id}>
                                    <td>{module.theme}</td>
                                    <td>{module.startDate}</td>
                                    <td>{module.endDate}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeacherModulesComponent;
