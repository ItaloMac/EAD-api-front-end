import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import ClassCreateComponent from "../../../components/admin/class/class-create";

 function ClassCreate (){

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
                <ClassCreateComponent/>
            </div>
        </div>
        </>
    )
 }

export default ClassCreate;