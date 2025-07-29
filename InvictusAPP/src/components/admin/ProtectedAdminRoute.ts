import { useState, useEffect, JSX } from "react";
import { useNavigate } from "react-router"; // Certifique-se de usar o roteador correto
import { IUserDetails } from "../../interfaces/IUserLogin";
import { Api } from "../../providers/Api";

interface ProtectedAdminRouteProps {
    children: JSX.Element; // Componente filho a ser renderizado
}

function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function AuthUser() {
            try {
                const userId = localStorage.getItem("userId");
                console.log("userId", userId);
                if (!userId) {
                    console.error("Usuário não está logado.");
                    navigate("/login");
                    return;
                }

                const response = await Api.get<IUserDetails>(`api/admin/usuarios/${userId}`);
                console.log("Dados do usuário:", response.data);

                const userType = response.data.userType;;
                if (userType == 1) { // Verifica se o usuário é do tipo administrador
                    console.error("Usuário não autorizado.");
                    navigate("/login");
                    return;
                }
                if(userType == 2)
                {
                    setIsAuthorized(true); // Usuário autorizado
                }
                setIsLoading(false); // Finaliza o carregamento
                
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                navigate("/login");
            } finally {
                setIsLoading(false); // Finaliza o carregamento
            }
        }

        AuthUser();
    }, [navigate]);

    if (isLoading) {
        return "Carregando..."; 
    }

    return isAuthorized ? children : null; // Renderiza o componente filho se autorizado
}

export default ProtectedAdminRoute;