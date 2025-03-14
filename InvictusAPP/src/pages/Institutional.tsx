import MenuBar from "../components/Layout/NavBar/MenuBar"
import Footer from "../components/Layout/Footer/Footer"
import InstitutionalComponent from "../components/InstitutionalComponent/InstitutionalComponent"

function Institutional(){
    return(
        <>
        <title>Invictus - Institucional</title>
        <section><MenuBar/></section>
        <section><InstitutionalComponent/></section>
        <Footer/>
        </>
    )
}

export default Institutional;