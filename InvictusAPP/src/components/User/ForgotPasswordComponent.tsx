import { useState } from "react";
import axios from "axios";
import { ForgotPasswordService } from "../../Services/ForgotPasswordService";

function UserLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");

    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setSucessMessage("");
        const formData = new FormData(event.currentTarget);

        const emailData = {
            email: formData.get("Email") as string,
        };

        if (!emailData.email) {
            setErrorMessage("Informe o email para redefinição de senha.");
            return;
        }

        try {
            const response = await ForgotPasswordService.postForgotPassword(emailData)
;            console.log(response.email);
            setSucessMessage("Foi enviado um email para redefinição de senha.");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.error);
            }
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setErrorMessage("Email não encontrado.");
            } else {
                setErrorMessage("Erro ao enviar o email.");
            }
        }
    };

    return (
        <>
        <div className="container mt-5 form-container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-3 border-0 rounded-4">
                        <div className="text-center mb-3">
                            <h3 className="fw-semibold">Esqueci minha senha</h3>
                            <p className="text-muted small mt-2">Informe o seu email para redefinição de senha.</p>
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

                            <div className="d-grid">
                                <button className="btn btn-primary custom-btn" type="submit">Redefinir Senha</button>
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