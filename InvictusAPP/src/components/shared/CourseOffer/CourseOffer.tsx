import { useState, useEffect } from "react";
import { ICursoService } from "../../../interfaces/ICursoService";
import { CursoService } from "../../../Services/CursoService";
import { Link, useParams } from "react-router";
import "../CourseOffer/CourseOffer.css";
import { jwtDecode, JwtPayload } from "jwt-decode";

function CursoOffer() {
    const [curso, setCurso] = useState<ICursoService | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function GetCursoById() {
            if (id) {
                const curso = await CursoService.getCursoById(id); 
                setCurso(curso);
            }
        }

        // Buscar ID do usuário logado no localStorage
        function getUserId() {
            const userIdLS = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
          
            if (!token) {
              setUserId(null);
              return;
            }
          
            try {
              const decoded: JwtPayload = jwtDecode(token);
          
              // checa expiração
              if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                console.warn("Token expirado");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setUserId(null);
                return;
              }
          
              // valida se o userId do token bate com o localStorage
              if (userIdLS && userIdLS === decoded.sub) {
                setUserId(userIdLS);
              } else {
                console.warn("UserId inconsistente");
                setUserId(null);
              }
            } catch (err) {
              console.error("Token inválido", err);
              setUserId(null);
            }
          }

        GetCursoById();
        getUserId();
    }, [id]);

    const handleEnrollClick = () => {
        if (!userId) {
            // Se não estiver logado, redireciona para o login
            window.location.href = '/login';
        }
    };

    return(
        <>
        <div className="card-price">
            <span className="badge text-bg-warning">{curso?.discount}% OFF EM TODO O CURSO!</span>
            <p className="total-price">De {curso?.fullPrice}</p>
            <p className="montly-price">{curso?.installments}x de {curso?.monthlyPrice}</p>
            <p className="price">ou a vista por apenas {curso?.cashPrice}</p>
            <p className="price t">*Parcela para pagamento no boleto parcelado</p>
            <div className="d-grid gap-2 col-6 mx-auto">
                {userId ? (
                    <Link to={`/pre-checkout/${userId}/${curso?.id}`} className="btn btn-light">
                        Matricule-se
                    </Link>
                ) : (
                    <button onClick={handleEnrollClick} className="btn btn-light">
                        Matricule-se
                    </button>
                )}
            </div>
        </div>            
        </>
    )
}

export default CursoOffer;