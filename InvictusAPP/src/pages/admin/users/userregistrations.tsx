import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import UserRegistrationComponent from "../../../components/admin/users/user-registration";

 function UserRegistrations (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do usuário inválido.</p>;
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
                <UserRegistrationComponent userId={id} />
            </div>
        </div>
        </>
    )
 }
export default UserRegistrations;