import { Api } from "../../../providers/Api";
import "../FormContact/FormContact.css";
import React from "react";


function CreateContact() {
    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //impede recarregamento da pagina
        const formData = new FormData(event.currentTarget);

        const contact = {
            Name: formData.get("Name"),
            Phone: formData.get("Phone"),
            Email: formData.get("Email")
        };

        try {
            const response = await Api.post("api/contact", contact);
            console.log("Contato criado com sucesso:", response.data);
            alert("Contato criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar contato:", error);
            alert("Erro ao criar contato. Tente novamente.");
        }
    } 

    return (
        <>
        <div className="div-form-contact">
            <div className="title-form-contact">
                <h3>Quer tirar dúvidas? Deixe o seu contato e aguarde a nossa ligação.</h3>
            </div>

            <form onSubmit={HandleSubmit} className=" form-contact">
                    <div className="col-auto">
                        <label htmlFor="Name">Nome:</label>
                        <input className="form-control" type="text" name="Name" id="Name" required />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="Phone">Telefone:</label>
                        <input className="form-control" type="text" name="Phone" id="Phone" required />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="Email">Email:</label>
                        <input className="form-control" type="email" name="Email" id="Email" required />
                    </div>
                <div className="col-auto">
                    <button className="button-contact" type="submit">Me ligue</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default CreateContact;
