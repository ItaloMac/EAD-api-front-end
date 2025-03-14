import { useState, useEffect } from "react";
import { useParams } from "react-router"; // Importe o useParams
import { ICursoService } from "../../interfaces/ICursoService";
import { CursoService } from "../../Services/CursoService";
import FormContact from "../shared/FormContact/FormContact";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CourseDetails/CourseDetails.css"
import FacultyList from "../shared/FacultyList/FacultyList";
import ModuleList from "../shared/ModuleList/ModuleList";
import CursoOffer from "../shared/CourseOffer/CourseOffer";
import DownArrow from "../../Utils/Icons/DownArrow.svg"
import Clock from "../../Utils/Icons/Clock.svg"
import Calendar from "../../Utils/Icons/Calendar.svg";
import Classroom from "../../Utils/Icons/Classroom.svg";
import Location from "../../Utils/Icons/Location.svg";

function DetalharCurso() {
    const [curso, setCurso] = useState<ICursoService | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function GetCursoById() {
            try {
                if (id) {
                    const curso = await CursoService.getCursoById(id);
                    setCurso(curso);
                }
            } catch (error) {
                console.error("Erro ao carregar curso:", error);
            }
        }

        GetCursoById();
    }, [id]); // Execute o efeito sempre que o id mudar

    if (!curso) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <section className="section-principal-curso">
                <div className="container-principal">
                    <>
                        <p className="modality">Pós-Graduação {curso.modality} - {curso.duration}</p>
                        <h1 className="title">{curso.name}</h1>
                        <div className="location">
                            <img src={Location} className="icon-location"/>
                            <h3 className="location-city">{curso.location}</h3>
                        </div>
                        <CursoOffer /> 
                    </>
                </div>
                <img src={DownArrow} className="DownArrow"/>
            </section>

            <section className="session-cards">
                <div className="row row-cols-1 row-cols-md-3 g-4 cards">
                    <div className="col">
                        <div className="card h-100 card">
                            <div className="card-body">
                                <img src={Clock} className="icon-clock" />              
                                <h5 className="card-title">Carga Horária:</h5>
                                <p className="card-text">{curso.workload}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <img src={Calendar} className="icon-calendar" />
                                <h5 className="card-title">Duração da especialização:</h5>
                                <p className="card-text">{curso.duration}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                            <img src={Classroom} className="icon-classroom" />
                                <h5 className="card-title">Previsão de Início:</h5>
                                <p className="card-text">{curso.startForecast}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="session">
                <h2>Apresentação do curso:</h2>
                <p>{curso.presentation}</p>
            </section>
            <section className="session">
                <h2>Proposta do curso:</h2>
                <p>{curso.proposal}</p>
            </section>
            <section className="session-faculty">
                <FacultyList />
            </section>
            <section className="session-module">
                <ModuleList />
            </section>
            <section className="section-offer">
                <div className="offer">
                    <h2 className="offer-title">Invista na sua carreira!</h2>
                    <CursoOffer/>
                </div>
            </section>
            <section className="section-form-contact">
                <FormContact />
            </section>
        </>
    );
}

export default DetalharCurso;