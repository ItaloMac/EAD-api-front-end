import { useState, useRef } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Api } from "../../providers/Api";
import './UserRegister.css';
import axios from "axios";
import isValidCPF from "../../Utils/CpfValidade";
import { useNavigate } from "react-router";

function UserRegister() {
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

        const user = {
            Name: formData.get("Name"),
            LastName: formData.get("LastName"),
            Email: formData.get("Email"),
            Password: formData.get("Password"),
            CPF: formData.get("CPF"),
        };

        if (!user.Name || !user.LastName || !user.Email || !user.Password || !user.CPF) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return;
        }

        const validateCpf = isValidCPF(user.CPF as string);
        if (!validateCpf) {
            setErrorMessage("CPF inválido.");
            return;
        }

        const password = String(user.Password);
        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
            return;
        }
        try {
            const response = await Api.post("api/Auth/Register", user);
            console.log(response.data);
            setSucessMessage("Cadastro realizado com sucesso. Entre no seu email e confirme o cadastro.");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                setErrorMessage(error.response.data.error);
            }
        }
    };

    return (
        <>
        <div className="container mt-5 form-container-register">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-3 border-0 rounded-4">
                        <div className="text-center mb-3">
                            <h3 className="fw-semibold">Faça o seu cadastro</h3>
                            <p className="text-muted small mt-2">É rápido, fácil e gratuito. Seus dados estão protegidos.</p>
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
                                <label htmlFor="Name" className="form-label">Nome:</label>
                                <input className="form-control" type="text" name="Name" id="Name" required />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="LastName" className="form-label">Sobrenome:</label>
                                <input className="form-control" type="text" name="LastName" id="LastName" required />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="Email" className="form-label">Email:</label>
                                <input className="form-control" type="email" name="Email" id="Email" required />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="validateCPF" className="form-label">CPF:</label>
                                <input className="form-control" type="text" name="CPF" id="CPF" required maxLength={11}  />
                                <p className="text-muted small mt-2">Não utilize traços e pontos.</p>
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
                                <p className="text-muted small mt-2">A senha deve conter no mínimo 6 caracteres, uma letra maiúscula, uma minúscula e um caractere especial</p>
                            </div>
                            <div className="form-check mb-2 small">
                                <input className="form-check-input" type="checkbox" id="privacyPolicy" required />
                                <label className="form-check-label" htmlFor="privacyPolicy">
                                Li e aceito a <a href="/politica-de-privacidade" target="_blank">Política de Privacidade</a>
                                </label>
                            </div>

                            <div className="form-check mb-2 small">
                                <input className="form-check-input" type="checkbox" id="termsOfUse" required />
                                <label className="form-check-label" htmlFor="termsOfUse">
                                Concordo com os <a href="/termos-de-uso" target="_blank">Termos de Uso</a>
                                </label>
                            </div>

                            <div className="form-check mb-3 small">
                                <input className="form-check-input" type="checkbox" id="copyrightPolicy" required />
                                <label className="form-check-label" htmlFor="copyrightPolicy">
                                Estou ciente da <a href="/politica-direitos-autorais" target="_blank">Política de Proteção aos Direitos Autorais</a>
                                </label>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary custom-btn" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserRegister;