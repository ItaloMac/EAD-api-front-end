import MenuBar from "../components/Layout/NavBar/MenuBar"
import Footer from "../components/Layout/Footer/Footer"
import ContactComponent from "../components/Contact/Contact";

function Contact(){
    return(
        <>
        <title>Invictus - Contato</title>
        <section><MenuBar/></section>
        <section><ContactComponent/></section>
        <Footer/>
        </>
    )
}

export default Contact;