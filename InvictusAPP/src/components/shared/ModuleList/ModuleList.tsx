import { useState, useEffect } from "react";
import { IModuloService  } from "../../../interfaces/IModuloService";
import { ModuloService } from "../../../Services/ModuloService";
import { useParams } from "react-router";
import "../ModuleList/Module.css";

function GetModulosByIdCurso(){
    const [modulo, setModulo] = useState<IModuloService[]>([]);
    const { id } = useParams<{ id:string }>();

    useEffect(() => {
            async function GetModulosByIdCurso() {
                
                try{
                    if(id) {
                        const modulo = await ModuloService.getModulosByIdCurso(id);
                        setModulo(modulo);
                    }
                    
                } catch(error) {
                    console.error("Erro ao carregar curso:", error);
                }
            }
            GetModulosByIdCurso();
        } , [id]);

        if (!modulo)
            return <div>Carregando...</div>;
        
        return (
            <>
            <div className="div-module-list">
                <h2>Módulos da especialização:</h2>

                {modulo?.map((modulo) => (
                    <div className="accordion accordion-flush" id="accordionFlushExample" key={modulo.id}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse-${modulo.id}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse-${modulo.id}`}
                                >
                                    {modulo.theme}
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse-${modulo.id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    {modulo.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </>
        );
    }

    export default GetModulosByIdCurso;