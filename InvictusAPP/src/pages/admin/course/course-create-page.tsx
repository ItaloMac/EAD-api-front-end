import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import CourseCreateComponent from "../../../components/admin/course/course-create";

 function CourseCreate (){
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
                <CourseCreateComponent/>
            </div>
        </div>
        </>
    )
 }

export default CourseCreate;