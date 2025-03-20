import MenuBar from "../components/Layout/NavBar/MenuBar"
import Footer from "../components/Layout/Footer/Footer"
import FacultyComponent from "../components/Faculty/Faculty"

function Institutional(){
    return(
        <>
        <title>Invictus - Corpo Docente</title>
        <section><MenuBar/></section>
        <section><FacultyComponent/></section>
        <Footer/>
        </>
    )
}

export default Institutional;