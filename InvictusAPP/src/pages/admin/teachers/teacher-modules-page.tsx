import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import TeacherModulesComponent from "../../../components/admin/teachers/teacher-modules-component";

 function TeacherModules (){
    const { id } = useParams(); // <-- PEGA O ID DA URL
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
                <TeacherModulesComponent teacherId={id || ''}/>
            </div>
        </div>
        </>
    )
 }

export default TeacherModules;