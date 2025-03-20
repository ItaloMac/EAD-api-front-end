import { useState, useEffect } from "react";
import { IProfessorService  } from "../../interfaces/IProfessorService";
import { ProfessoresService } from "../../Services/ProfessorService";
import "../Faculty/Faculty.css";
import { Col, Container, Row } from "react-bootstrap";

function LoadingTeachers() {
    const [teachers, setTeachers] = useState<IProfessorService[]>([]);

    useEffect(() => {
        async function GetAllTeachers() {
            try {
                    const teachers = await ProfessoresService.getAllTeachers();
                    setTeachers(teachers);
    
            } catch (error) {
                console.error("Erro ao carregar os professores:", error);
            }
        }

        GetAllTeachers();
    });

    return(
        <section className="section-cursos">
        <Container>
        <h2 className="title-faculty">Conheça nossos professores</h2>
          <Row>
              {teachers.map((teacher) => (
                  <Col xs="auto" lg="auto">
                    <>
                      <img className="img-curso" key={teacher.id} src= {teacher.imagemUrl} alt="imagem do curso" />
                      <p className="title-curso" key={teacher.id}>{teacher.name}</p>
                      <p className="modality-curso" key={teacher.id}>{teacher.miniResume}.</p>
                    </>
                  </Col>
                ))}
          </Row>
        </Container>
      </section>
    )
};

export default LoadingTeachers

