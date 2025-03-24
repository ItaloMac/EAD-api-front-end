import bannercontato from "../../Utils/imgs/BANNERCONTATO.png"
import FormContact from "../shared/FormContact/FormContact"
import "../Contact/Contact.css"

function Contact() {
    return(
        <>
        <div>
            <img src={bannercontato} className="d-block w-100" alt="..." />
        </div>
        <section className="section-contact">
            <div className="div-contact">
                <div className="">
                    <h3>Entre em contato conosco através dos canais de comunicação abaixo:</h3>
                    <p className="contact-wpp">Whatsapp de atendimento: (74) 9 9994-2121</p>
                    <p className="contact-email">Email: secretariaposinvictus@gmail.com</p>
                </div>
            </div>
        </section>
        <div className="div-formulario">
            <FormContact />
        </div>
        </>
    )
}

export default Contact