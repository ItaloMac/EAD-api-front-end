import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import CourseTeachersComponent from "../../../components/admin/course/course-teachers-component";

 function CourseTeachers (){
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
                <CourseTeachersComponent courseId={id}/>
            </div>
        </div>
        </>
    )
 }

export default CourseTeachers;