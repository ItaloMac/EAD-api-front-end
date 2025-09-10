import CoursesComponent from "../../../components/admin/course/courses-component";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"

 function CoursesPage (){
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
                <CoursesComponent/>
            </div>
        </div>
        </>
    )
 }

export default CoursesPage;