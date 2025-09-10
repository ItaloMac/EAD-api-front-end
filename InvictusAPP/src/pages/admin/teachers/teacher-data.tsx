import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import TeacherDataComponent from "../../../components/admin/teachers/teacher-data-component";

 function TeacherData (){
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
                <TeacherDataComponent id={id || ''}/>
            </div>
        </div>
        </>
    )
 }

export default TeacherData;