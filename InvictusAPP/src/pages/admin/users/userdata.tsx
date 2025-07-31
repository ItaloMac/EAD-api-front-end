import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import UserDataComponent from "../../../components/admin/users/user-data";

 function UserData (){
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
                <UserDataComponent userId={id} />
            </div>
        </div>
        </>
    )
 }
export default UserData;