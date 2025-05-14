import MenuBar from "../components/Layout/NavBar/MenuBar"
import LoginUser from "../components/User/LoginUser"
import Footer from "../components/Layout/Footer/Footer"

function Login() {
    return (
     <>
      <title>Invictus - Login</title>
      <section><MenuBar/></section>
      <section><LoginUser/></section>
      <Footer/>
      </>
    )
  }
export default Login