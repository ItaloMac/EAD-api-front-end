import logo from "../../../Utils/imgs/logo.png"
import "../../Layout/NavBar/MenuBar.css"

function MenuBar(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav">
            <div className="container-fluid" style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" width="60" height="auto" className="d-inline-block align-text-top" />
                </a>          
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="/">Cursos</a>
                        <a className="nav-link" href="/institucional">Institucional</a>
                        <a className="nav-link" href="/corpodocente">Professores</a>
                        <a className="nav-link" href="/contato">Contato</a>
                        {/* Dropdown do Portal do Aluno */}
                       
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Área do Aluno
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="/login">Login</a></li>
                            <li><a className="dropdown-item" href="/criar-conta">Cadastrar</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuBar