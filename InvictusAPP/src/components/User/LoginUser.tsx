import { useState, useRef } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Api } from "../../providers/Api";
import axios from "axios";
import { useNavigate } from "react-router";
import "./LoginUser.css";

function UserLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    const [eyeIsClosed, setEyeState] = useState(false); // Estado para alternar o ícone
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


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

        const loginData = {
            Email: formData.get("Email"),
            Password: formData.get("Password"),
        };

        if (!loginData.Email || !loginData.Password) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return;
        }

        if (
            (loginData.Password as string).length < 6 || // Verifica se a senha tem menos de 6 caracteres
            !/[A-Z]/.test(loginData.Password as string) || // Verifica se não contém pelo menos uma letra maiúscula
            !/[a-z]/.test(loginData.Password as string) || // Verifica se não contém pelo menos uma letra minúscula
            !/[0-9]/.test(loginData.Password as string) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(loginData.Password as string)   // Verifica se não contém pelo menos um número
        ) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caracter especial.");
            return;
        }
        try {
            // Verifica se o email está confirmado
            const emailCheckResponse = await Api.post("/api/EmailConfirmation/check-email-confirmation", { Email: loginData.Email });
            console.log(emailCheckResponse.data);

            const response = await Api.post("/login", loginData);
            console.log(response.data);
            setSucessMessage("Login realizado com sucesso.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.error);
            }
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setErrorMessage("Senha inválida.");
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