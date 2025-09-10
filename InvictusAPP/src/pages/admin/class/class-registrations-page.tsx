import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import ClassRegistrationsComponent from "../../../components/admin/class/class-registrations";
import { useParams } from "react-router";

 function ClassRegistrations (){
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
                <ClassRegistrationsComponent  classId={id}/>
            </div>
        </div>
        </>
    )
 }

export default ClassRegistrations;