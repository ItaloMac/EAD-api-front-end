import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import RegistrationsListComponent from "../../../components/admin/registrations/registrations-list";

 function Registrations (){
    return(
        <>
        <div>
            <div className="mb-4">
                <MenuBarAdmin />
            </div>

            <div className="d-flex">
                <div>
                    <MenuLateral />
                </div>
                <RegistrationsListComponent />
            </div>
        </div>
        </>
    )
 }

export default Registrations;