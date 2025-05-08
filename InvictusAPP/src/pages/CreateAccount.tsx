import MenuBar from "../components/Layout/NavBar/MenuBar"
import UserRegister from "../components/UserRegister"
import Footer from "../components/Layout/Footer/Footer"

function CriarConta() {
    return (
     <>
      <title>Invictus - Criar Conta</title>
      <section><MenuBar/></section>
      <section><UserRegister/></section>
      <Footer/>
      </>
    )
  }
export default CriarConta