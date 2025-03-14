import { useState, useEffect } from "react";
import { IProfessorService  } from "../../../interfaces/IProfessorService";
import { ProfessoresService } from "../../../Services/ProfessorService";
import { useParams } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../shared/FacultyList/ProfessoresList.css";

function GetProfessoresByIdCurso(){
    const [professor, setProfessor] = useState<IProfessorService[]>([]);
    const { id } = useParams<{ id:string }>();

    useEffect(() => {
            async function GetProfessoresByIdCurso() {
                
                try{
                    if(id) {
                        const professor = await ProfessoresService.getProfessoresByIdCurso(id);
                        setProfessor(professor);
                    }
                    
                } catch(error) {
                    console.error("Erro ao carregar os professores:", error);
                }
            }
            GetProfessoresByIdCurso();
        } , [id]);

        if (!professor)
            return <div>Carregando...</div>;

        const chunkArray = (array: IProfessorService[], size: number) => {
          const result = [];
          for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
          }
          return result;
        };
        
        const professorGroups = chunkArray(professor, 2); // Divide os professores em grupos de 3
        
        return (
          <>
            <>
            <h2 className="title-faculty">Conheça o Corpo Docente:</h2>

              <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide slide-teachers"
              data-bs-touch="false"
              data-bs-ride="carousel" 
              data-bs-interval="3000" 
            >
                <div className="carousel-inner">
                  {professorGroups.map((group, groupIndex) => (
                    <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                      <div className="card-group">
                        {group.map((professor) => (
                          <div className="card teacher" key={professor.id}>
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                              <h5 className="card-title">{professor.name}</h5>
                              <p className="card-text">Descrição do professor.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
              </div>
              </>
          </>
        )
    }

    export default GetProfessoresByIdCurso;