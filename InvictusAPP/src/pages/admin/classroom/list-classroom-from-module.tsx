import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import { useParams } from "react-router";
import { ListClassroomFromModuleComponent } from "../../../components/admin/classroom/list-classroom-from-module";

 function ListClassroomFromModule (){
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
                <ListClassroomFromModuleComponent moduleId={id}/>
            </div>
        </div>
        </>
    )
 }

export default ListClassroomFromModule;