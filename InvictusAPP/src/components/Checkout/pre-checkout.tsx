import { useEffect, useState } from "react";
import { useParams } from "react-router";  // <-- IMPORTANTE
import { UsersService } from '../../Services/Admin/UsersService';
import UserDataAddress from "../admin/Address/user-data-address";
import UserLogin from "../User/LoginUser";
import MenuBar from "../Layout/NavBar/MenuBar";
import Footer from "../Layout/Footer/Footer";
import { CreateCheckout } from "../../Services/CreateCheckout";

function PreCheckout() {
    const { userId } = useParams<{ userId: string }>(); // <-- PEGA O PARAMETRO DA ROTA
    const { cursoId } = useParams<{ cursoId: string }>(); // <-- PEGA O PARAMETRO DA ROTA
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true);
                if (userId) {
                    const userData = await UsersService.getUserById(userId);
                    if (userData) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [userId, cursoId]);

    if (loading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Verificando dados do usuário...</p>
            </div>
        );
    }

    const handleCheckout = async () => {
        try {
            const checkoutResponse = await CreateCheckout.postCheckout(cursoId!);
            
            window.location.href = checkoutResponse.checkoutUrl;
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            setMessage("Confira os dados de endereço e tente novamente.");
        }
    };
    
    return (
        <>
        <title>Invictus - Pré Checkout</title>
        <section>
            <MenuBar/>
        </section>
        <section className="">
        <div className="container mt-5 mb-5 p-3 mb-2 bg-body-tertiary rounded-4 w-50">
            <div className="row custom-form">
                <h2 className="d-flex justify-content-center text-secondary">Falta pouco para garantir seu curso!</h2>
                <p className="d-flex justify-content-center">Confirme seus dados de endereço para da andamento na compra.</p>
                {message && <div className="alert alert-danger" role="alert">{message}</div>}
            </div>
            {isLoggedIn ? (
                <div style={{marginTop: '-40px'}}>
                    <UserDataAddress  userId={userId!} />
                <div className="row custom-form">
                    <button className="btn btn-success row mb-4 mt-0 d-flex justify-content-center" onClick={handleCheckout}>Finalizar Compra</button>      
                </div>
                </div>          
            ) : (
                <UserLogin />
            )}
        </div>
        
        </section>
        <Footer/>
        </>
    );
}

export default PreCheckout;
