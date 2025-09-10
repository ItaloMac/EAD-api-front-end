import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import { useParams } from "react-router";
import UpdateClassroomFromModuleComponent from "../../../components/admin/classroom/update-classroom-from-module";

 function UpdateClassroomPage (){
    const { moduleId, classroomId } = useParams(); // <-- PEGA AMBOS OS IDs DA URL

    if (!moduleId || !classroomId) return <p>IDs inválidos.</p>;
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
                <UpdateClassroomFromModuleComponent classroomId={classroomId} moduleId={moduleId}/>
            </div>
        </div>
        </>
    )
 }

export default UpdateClassroomPage;