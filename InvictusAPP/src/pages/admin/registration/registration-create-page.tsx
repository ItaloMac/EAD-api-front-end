import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import RegistrationCreateComponent from "../../../components/admin/registrations/registration-create";

 function RegistrationCreate (){
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
                <RegistrationCreateComponent/>
            </div>
        </div>
        </>
    )
 }

export default RegistrationCreate;