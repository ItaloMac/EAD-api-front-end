import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import TeachersComponent from "../../../components/admin/teachers/teachers-component";

 function Teachers (){

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
                <TeachersComponent/>
            </div>
        </div>
        </>
    )
 }

export default Teachers;