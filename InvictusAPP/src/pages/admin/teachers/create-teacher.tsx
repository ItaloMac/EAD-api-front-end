import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import CreateTeacherComponent from "../../../components/admin/teachers/create-teacher-component";

 function CreateTeacher (){

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
                <CreateTeacherComponent/>
            </div>
        </div>
        </>
    )
 }

export default CreateTeacher;