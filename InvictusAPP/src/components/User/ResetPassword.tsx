import { useState, useRef } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Api } from "../../providers/Api";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";



function ResetPassword
() {
    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    const [eyeIsClosed, setEyeState] = useState(false); 
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

     // Obter parâmetros da query string (?userId=...&code=...)
     const userId = searchParams.get('userId');
     const code = searchParams.get('code');


    const toggleShow = () => {
        if (inputRef.current) {
            if (inputRef.current.type === "password") {
                inputRef.current.type = "text";
                setEyeState(true);
            } else {
                inputRef.current.type = "password";
                setEyeState(false);
            }
        }
    };

    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setSucessMessage("");
        
        const password = event.currentTarget.Password.value;

        if (!password) {
            setErrorMessage("Informe a nova senha.");
            return;
        }

        if (password.length < 6 || !/[A-Z]/.test(password) || 
            !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.");
            return;
        }

        if (!userId || !code) {
            setErrorMessage("Link inválido ou expirado.");
            return;
        }

        console.log(userId, code, password);


        try {
            await Api.post("/ResetPassword/reset-password", {
                userId,
                resetCode: encodeURIComponent(code),
                newPassword: password
            });
            
            setSucessMessage("Senha alterada com sucesso.");
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.title || 
                                error.response?.data?.error || 
                                "Erro ao alterar a senha. Tente novamente.";
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage("Ocorreu um erro inesperado.");
            }
        }
    };

    return (
        <>
        <div className="container form-container mt-5">
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-3 border-0 rounded-4">
                        <div className="text-center mb-3">
                            <h3 className="fw-semibold">Redefinir Senha</h3>
                            <p className="text-muted small mt-2">Escolha sua nova senha.</p>
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger text-center small" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        {sucessMessage && (
                            <div className="alert alert-success text-center small" role="alert">   
                                {sucessMessage}
                            </div>
                        )}  
                              
                        <form onSubmit={HandleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Nova senha:</label>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        ref={inputRef}
                                        type="password"
                                        name="Password"
                                        id="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleShow}
                                    >
                                        {eyeIsClosed ? <VscEyeClosed /> : <VscEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary custom-btn" type="submit">Salvar nova senha.</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ResetPassword
;