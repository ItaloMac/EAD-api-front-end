import MenuBar from "../components/Layout/NavBar/MenuBar"
import Footer from "../components/Layout/Footer/Footer"
import ResetPassword from "../components/User/ResetPassword"

function NovaSenha() {
    return (
     <>
      <title>Invictus - Nova Senha</title>
      <section><MenuBar/></section>
      <section><ResetPassword/></section>
      <Footer/>
      </>
    )
  }
export default NovaSenha