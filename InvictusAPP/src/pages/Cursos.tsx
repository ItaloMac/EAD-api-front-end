import ListarCursos from "../components/ListarCursos"
import MenuBar from "../components/Layout/MenuBar"
import Carrossel from "../components/shared/Carrossel"
import Footer from "../components/Layout/Footer"

function Cursos() {
    return (
     <>
      <title>Invictus - Cursos</title>
      <section><MenuBar/></section>
      <section><Carrossel/></section>
      <section><ListarCursos/></section>
      <Footer/>
      </>
    )
  }
export default Cursos