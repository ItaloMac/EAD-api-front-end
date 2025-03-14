import MenuBar from "../components/Layout/NavBar/MenuBar"
import Footer from "../components/Layout/Footer/Footer"
import CourseDetails from "../components/CourseDetails/CourseDetails"


function ProdutoCurso() {
    return (
     <>
      <title>Invictus - Curso</title>
      <section><MenuBar/></section>
      <section><CourseDetails/></section>
      <Footer/>
      </>
    )
  }
export default ProdutoCurso