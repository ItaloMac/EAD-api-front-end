import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import RegistrationDataComponent from "../../../components/admin/registrations/registration-data";
import MenuLateral from "../../../components/admin/shared/menu-lateral"

 function RegistrationData (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do usuário inválido.</p>;
    return(
        <>
        <div>
            <div className="mb-4">
                <MenuBarAdmin />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div>
                    <MenuLateral />
                </div>
                <RegistrationDataComponent id={id}/>
            </div>
        </div>
        </>
    )
 }

export default RegistrationData;