import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import AddClassCourseComponent from "../../../components/admin/class/add-class-course-component";

 function AddClassToCourse (){
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
                <AddClassCourseComponent courseId={id}/>
            </div>
        </div>
        </>
    )
 }

export default AddClassToCourse;