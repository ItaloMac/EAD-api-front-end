import MenuBar from "../components/Layout/NavBar/MenuBar"
import Carrossel from "../components/shared/Carrossel"
import Footer from "../components/Layout/Footer/Footer"
import CourseList from "../components/CorseList/CourseList"

function Cursos() {
    return (
     <>
      <title>Invictus - Cursos</title>
      <section><MenuBar/></section>
      <section><Carrossel/></section>
      <section><CourseList/></section>
      <Footer/>
      </>
    )
  }
export default Cursos