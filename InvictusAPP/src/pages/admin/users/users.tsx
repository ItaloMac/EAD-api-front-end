import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import UsersList from "../../../components/admin/users/users-list";

 function Users (){
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
                <UsersList />
            </div>
        </div>
        </>
    )
 }

export default Users;