import { useParams } from "react-router";
import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import UserDataComponent from "../../../components/admin/users/user-data";
import UserDataAddress from "../../../components/admin/Address/user-data-address";

 function UserData (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do usuário inválido.</p>;
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
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <UserDataComponent userId={id} />
                    <div style={{ marginTop: '0px' }}>
                    <UserDataAddress userId={id}/>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
 }
export default UserData;