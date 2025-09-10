import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import { useParams } from "react-router";
import ClassDataComponent from "../../../components/admin/class/class-data";

 function ClassData (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID da turma inválido.</p>;
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
                <ClassDataComponent classId={id}/>
            </div>
        </div>
        </>
    )
 }

export default ClassData;