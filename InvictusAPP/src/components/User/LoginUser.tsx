import { useState, useRef } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
//import { Api } from "../../providers/Api";
import axios from "axios";
import "./LoginUser.css";
import { UserLoginService } from "../../Services/UserLoginService";
import { useNavigate } from "react-router";

function UserLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [sucessMessage, setSucessMessage] = useState("");
    const [eyeIsClosed, setEyeState] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
        const formData = new FormData(event.currentTarget);

        // Convertendo FormData para IUserLoginRequest
        const loginData = {
            email: formData.get("Email")?.toString() || '',
            password: formData.get("Password")?.toString() || ''
        };

        if (!loginData.email || !loginData.password) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return;
        }

        if (
            loginData.password.length < 6 ||
            !/[A-Z]/.test(loginData.password) ||
            !/[a-z]/.test(loginData.password) ||
            !/[0-9]/.test(loginData.password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(loginData.password)
        ) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caracter especial.");
            return;
        }

        try {
            const response = await UserLoginService.postUserLoginAsync(loginData);
            const userType = response.token.userType;
            localStorage.setItem("token", response.token.token);
            localStorage.setItem("userId", response.token.userId);
            if (userType === 1) {
              navigate("/portal-aluno");
            } else if (userType === 2) {
              navigate("/admin/painel-administrativo");
            }

           } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                const message = data?.Error || data?.error || "Erro ao realizar login";

                setErrorMessage(message);
            } else {
                setErrorMessage("Erro inesperado ao tentar fazer login.");
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
                            <h3 className="fw-semibold">Login</h3>
                            <p className="text-muted small mt-2">Entre com seu email e senha.</p>
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

                            <div className="mb-2">
                                <label htmlFor="Email" className="form-label">Email:</label>
                                <input className="form-control" type="email" name="Email" id="Email" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Senha:</label>
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
                                <button className="btn btn-primary custom-btn" type="submit">Entrar</button>
                            </div>
                            <div className="d-flex justify-content-start mt-3">
                                <a href="/esqueci-senha" className="text-decoration-none text-primary small">
                                    Esqueci minha senha
                                </a>
                                <span className="mx-2 text-muted">|</span>
                                <a href="/criar-conta" className="text-decoration-none text-primary small">
                                    Cadastre-se
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserLogin;