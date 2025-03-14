import { useState, useEffect } from "react";
import { ICursoService } from "../../../interfaces/ICursoService";
import { CursoService } from "../../../Services/CursoService";
import { useParams } from "react-router";
import "../CourseOffer/CourseOffer.css";


function CursoOffer() {
    const [curso, setCurso] = useState<ICursoService | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function GetCursoById() {
            if (id) {
                const curso = await CursoService.getCursoById(id); 
                setCurso(curso);
            } else {
                return <div>Carregando...</div>;
            }
        }

        GetCursoById();
    }, [id]);

    return(
        <>
        <div className="card-price">
            <span className="badge text-bg-warning">{curso?.discount}% OFF EM TODO O CURSO!</span>
            <p className="total-price">De {curso?.fullPrice}</p>
            <p className="montly-price">{curso?.installments}x de {curso?.monthlyPrice}</p>
            <p className="price">ou a vista por apenas {curso?.cashPrice}</p>
            <p className="price t">*Parcela para pagamento no boleto parcelado</p>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-light" type="button">Matricule-se</button>
            </div>
        </div>            
        </>
    )
}

export default CursoOffer;