import { useEffect, useState } from "react";
import { UsersService } from "../../../Services/Admin/UsersService";
import { IUsersRegistrationService } from "../../../interfaces/admin/IUsersService";
import "./user-registration.css"; 
import { Link } from "react-router";

function UserRegistrationComponent({ userId }: { userId: string }) {
    const [registrations, setRegistrations] = useState<IUsersRegistrationService[]>([]);

    useEffect(() => {
        async function fetchRegistrations(userId: string) {
            try {
                const response = await UsersService.getRegistrationByUserId(userId);
                setRegistrations(response);
            } catch (error) {
                console.error("Erro ao buscar matrículas:", error);
            }
        }
        fetchRegistrations(userId);
    }, [userId]);

    return (
        <div className="user-registration-component fixed-container">
            <h2 className="mb-4 justify-content-start">Matrículas do Usuário</h2>
            {registrations.length > 0 ? (
                <div className="cards-container">
                    {registrations.map((registration, index) => (
                        <div key={index} className=" mb-4">
                            <div className="card h-100 custom-card">
                                <div className="card-body">
                                    <h5 className="card-title">Matrícula #{index + 1}</h5>
                                    <p className="card-text">
                                        <strong>Status:</strong> {registration.registrationStatus}
                                    </p>
                                    <p className="card-text">
                                        <strong>Curso:</strong> {registration.class.curso.name}
                                    </p>
                                    <p className="card-text">
                                        <strong>Classe:</strong> {registration.class.name}
                                    </p>
                                    <p className="card-text">
                                        <strong>Data de Matrícula:</strong> {registration.registrationDate}
                                    </p>
                                    <p className="card-text">
                                        <strong>Data de Cancelamento:</strong> {registration.cancellationDate || "N/A"}
                                    </p>
                                </div>
                                <div className="text-start">
                                    <Link to={`/admin/matricula/${registration.id}`} className="btn-custom" title="Editar Matrícula">Editar matrícula</Link>
                                    <Link to={`/admin/matriculas/${registration.id}/update`} className="btn btn-warning py-2 ms-2" title="Editar Matrícula">Trancar matrícula</Link>
                                </div>
                            </div>
                            <Link to={`/admin/usuarios/`} className="btn btn-outline-secondary" style={{marginRight:'5px', marginTop:'15px'}} title="voltar">Voltar</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-start">Nenhuma matrícula encontrada.</p>
            )}
        </div>
    );
}

export default UserRegistrationComponent;