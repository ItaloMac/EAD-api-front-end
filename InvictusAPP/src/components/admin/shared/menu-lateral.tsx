import 'bootstrap-icons/font/bootstrap-icons.css';

function MenuLateral() {
  return (
    <>

<div
  className="d-none d-lg-block p-3"
  style={{ width: '350px', minHeight: '100vh', backgroundColor: '#0000',borderRight: '1px solid #dee2e6' }}
>
  <ul className="list-unstyled">
    <li className="nav-item mb-2">
      <span className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <i className="me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f', marginLeft: '12px' }} ></i> Menu
      </span>
    </li>
    <li className="nav-item">
      <a href="/admin/painel-administrativo" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-speedometer2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Dashboard
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/usuarios" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-people me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Alunos
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/matriculas" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-clipboard2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Matrículas
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/turmas" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-backpack2 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Turmas
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/professores" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-person-video3 me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Professores
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/cursos" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-mortarboard me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Cursos
      </a>
    </li>
    <li className="nav-item">
      <a href="/admin/financeiro" className="nav-link" style={{ color: '#0c2f4f', fontSize: '1.25rem',  marginTop:'10px' }}>
        <i className="bi bi-cash-coin me-2" style={{ fontSize: '1.5rem', color: '#0c2f4f' }}></i> Financeiro
      </a>
    </li>
  </ul>
</div>


    </>
  );
}

export default MenuLateral;
