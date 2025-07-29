import logo from "../../../Utils/imgs/logo.png"
import "../../admin/layout/MenuBarAdmin.css"

function MenuBarAdmin(){
    return (
        
        <><nav className="navbar mobile-only">
            {/* Nav mobile*/}
            <div className="container-fluid" style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <a className="navbar-brand" href="/painel-administrativo">
                    <img src={logo} alt="Logo" width="60" height="auto" className="d-inline-block align-text-top" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="bi bi-speedometer2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} aria-current="page" href="/admin/painel-administrativo">Dashboard</a>
                        <a className="bi bi-people me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} aria-current="page" href="/admin/usuarios">Alunos</a>
                        <a className="bi bi-clipboard2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} href="/admin/matriculas">Matrículas</a>
                        <a className="bi bi-backpack2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} href="/admin/turmas">Turmas</a>
                        <a className="bi bi-mortarboard me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} href="/admin/cursos">Cursos</a>
                        <a className="bi bi-cash-coin me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginTop: '10px', marginLeft: '-13px' }} href="/admin/financeiro">Financeiro</a>

                    </div>
                    <hr
                        style={{
                            width: "100%",
                            border: "0",
                            borderTop: "1px solid #ccc",
                            margin: "10px 0",
                        }} />

                    <div style={{ marginRight: '-15px' }}>
                        <button type="button" className="btn btn-primary">Minha Conta</button>
                        <button type="button" className="btn btn-link">Sair</button>
                    </div>
                </div>
            </div>
        </nav>
        
        <nav className="navbar desktop-only">
            <div className="container-fluid" style={{ maxWidth: 'auto', margin: '0 auto' }}>
                <a className="navbar-brand" style={{ paddingLeft: '20px' }} href="/">
                    <img src={logo} alt="Logo" width="60" height="auto" className="d-inline-block align-text-top" />
                </a>
                
                <div className="d-flex ms-auto align-items-center" style={{ paddingRight: '40px' }}>
                <p><a href="#" style={{ paddingRight: '35px' }} className="link-primary link-offset-2 link-underline-opacity-25"> <i className="bi bi-person fs-2"></i></a></p>

                <p><a href="#" className="link-secondary link-offset-2 link-underline-opacity-25">Sair</a></p>

                </div>
            </div>
        </nav></>

        
    )
}

export default MenuBarAdmin