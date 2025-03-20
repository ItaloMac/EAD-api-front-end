import { useState, useEffect } from "react";
import { ICursoService } from "../../interfaces/ICursoService";
import { CursoService } from "../../Services/CursoService";
import cursoImg from "../../Utils/imgs/curso.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../CorseList/CourseList.css"
import { Link } from "react-router";


function ListarCursos(){
    const [cursos, setCursos] = useState<ICursoService[]>([]);

    useEffect(() =>{
        async function CarregarCursos(){
            try {
                const cursos = await CursoService.getAllCursos();
                setCursos(cursos);
            } catch (Error) {
                console.error("Erro ao carregar cursos:", Error);
            }
        }

        CarregarCursos();

    }, []);

    return (
      <section className="section-cursos">
        <Container>
        <h2>Cursos</h2>
          <Row className="row-cursos">
              {cursos.map((curso) => (
                  <Col xs="auto" lg="auto" className="col-cursos">
                    <>
                      <img className="img-curso" src= {cursoImg} alt="imagem do curso" />
                      <p className="title-curso" key={curso.id}>{curso.name}</p>
                      <p className="modality-curso" key={curso.id}>{curso.modality} em {curso.location}.</p>
                      <p className="price-curso" key={curso.id}>50% OFF em todo o curso.</p>
                      <Link to={`/curso/${curso.id}`} className="btn btn-primary btn-curso" role="button">Saiba mais</Link>
                    </>
                  </Col>
                ))}
          </Row>
        </Container>
      </section>
    )
}

export default ListarCursos;