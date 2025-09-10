import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import { useParams } from "react-router";
import CreateClassroomFromModuleComponent from "../../../components/admin/classroom/create-classroom-from-module";

 function CreateClassroomFromModulePage (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do modulo inválido.</p>;
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
                <CreateClassroomFromModuleComponent moduleId={id}/>
            </div>
        </div>
        </>
    )
 }

export default CreateClassroomFromModulePage;