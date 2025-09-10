import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import AddTeacherComponent from "../../../components/admin/course/add-teacher-component";

 function AddTeacherToCourse (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do curso inválido.</p>;
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
                <AddTeacherComponent CourseId={id}/>
            </div>
        </div>
        </>
    )
 }

export default AddTeacherToCourse;