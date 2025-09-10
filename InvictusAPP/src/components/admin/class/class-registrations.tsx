import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ClassService } from "../../../Services/Admin/ClassService";
import { RegistrationService } from "../../../Services/Admin/RegistrationService";
import { IGetClassByIdService } from "../../../interfaces/admin/IClassService";
import { IGetRegistrationByIdService } from "../../../interfaces/admin/IRegistrationService";
import "./class-registrations.css";

function ClassRegistrationsComponent({ classId }: { classId: string }) {
    const [classData, setClassData] = useState<IGetClassByIdService | null>(null);
    const [registrations, setRegistrations] = useState<IGetRegistrationByIdService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClassAndRegistrations() {
            if (!classId) {
                setLoading(false);
                return;
            }

            try {
                // Buscar dados da turma
                const classResponse = await ClassService.getClassById(classId);
                setClassData(classResponse);

                // Verificar se existem matrículas relacionadas e buscar detalhes
                if (classResponse.relacionedRegistrations && classResponse.relacionedRegistrations.length > 0) {
                    const registrationPromises = classResponse.relacionedRegistrations.map(registration =>
                        RegistrationService.getRegistrationById(registration.id)
                    );
                    
                    const registrationsData = await Promise.all(registrationPromises);
                    setRegistrations(registrationsData);
                } else {
                    setRegistrations([]);
                }
            } catch (error) {
                console.error("Erro ao buscar dados da turma e matrículas:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchClassAndRegistrations();
    }, [classId]);

    if (loading) {
        return <div className="text-center">Carregando...</div>;
    }

    if (!classData) {
        return <div className="text-center">Turma não encontrada.</div>;
    }

    return (
        <div className="class-registrations-component fixed-container">
            <h2 className="mb-4 justify-content-start">
                Matrículas da Turma: {classData.name}
            </h2>
            <div className="mb-3">
                <p><strong>Curso:</strong> {classData.relacionedCourse.name}</p>
                <p><strong>Período:</strong> {new Date(classData.startDate).toLocaleDateString()} - {new Date(classData.endDate).toLocaleDateString()}</p>
            </div>
            
            {registrations.length > 0 ? (
                <div className="cards-container">
                    {registrations.map((registration, index) => (
                        <div key={registration.id} className="mb-4">
                            <div className="card h-100 custom-card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        {registration.user.profilePhoto ? (
                                            <img 
                                                src={registration.user.profilePhoto} 
                                                alt={`${registration.user.name} ${registration.user.lastName}`}
                                                className="student-photo me-3"
                                            />
                                        ) : (
                                            <div className="student-photo-placeholder me-3">
                                                <i className="bi bi-person-fill"></i>
                                            </div>
                                        )}
                                        <div>
                                            <h5 className="card-title mb-1">
                                                {registration.user.name} {registration.user.lastName}
                                            </h5>
                                            <p className="text-muted mb-0">Matrícula #{index + 1}</p>
                                        </div>
                                    </div>
                                    
                                    <p className="card-text">
                                        <strong>Status:</strong> {registration.registrationStatus}
                                    </p>

                                    <p className="card-text">
                                        <strong>Telefone:</strong> {registration.user.phoneNumver}
                                    </p>
                                    <p className="card-text">
                                        <strong>Data de Matrícula:</strong> {new Date(registration.registrationDate).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>Data de Cancelamento:</strong> {registration.cancellationDate ? new Date(registration.cancellationDate).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                                <div className="text-start">
                                    <Link 
                                        to={`/admin/matricula/${registration.id}`} 
                                        className="btn-custom" 
                                        title="Ver detalhes da matrícula"
                                    >
                                        Ver matrícula
                                    </Link>
                                    <Link 
                                        to={`/admin/aluno/${registration.user.id}`} 
                                        className="btn btn-info py-2 ms-2" 
                                        title="Ver perfil do aluno"
                                    >
                                        Ver aluno
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-start">Nenhuma matrícula encontrada para esta turma.</p>
            )}
            
            <div className="mt-4">
                <Link 
                    to="/admin/turmas" 
                    className="btn btn-outline-secondary" 
                    title="Voltar para lista de turmas"
                >
                    Voltar para Turmas
                </Link>
            </div>
        </div>
    );
}

export default ClassRegistrationsComponent;
