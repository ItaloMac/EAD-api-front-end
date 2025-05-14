import MenuBar from "../components/Layout/NavBar/MenuBar"
import ForgotPasswordComponent from "../components/User/ForgotPasswordComponent"
import Footer from "../components/Layout/Footer/Footer"

function ForgotPassword() {
    return (
     <>
      <title>Invictus - Redefinir Senha</title>
      <section><MenuBar/></section>
      <section><ForgotPasswordComponent/></section>
      <Footer/>
      </>
    )
  }
export default ForgotPassword