import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import DeleteUserComponent from "../../../components/admin/users/delete-user";
 
function UserDelete (){
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
                <DeleteUserComponent userId={id} />
            </div>
        </div>
        </>
    )
 }
export default UserDelete;