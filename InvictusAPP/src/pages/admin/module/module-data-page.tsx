import MenuBarAdmin from "../../../components/admin/layout/MenuBarAdmin"
import MenuLateral from "../../../components/admin/shared/menu-lateral"
import { useParams } from "react-router";
import ModuleDataComponent from "../../../components/admin/module/module-data-component";

 function ModuleData (){
    const { id } = useParams(); // <-- PEGA O ID DA URL

    if (!id) return <p>ID do module inválido.</p>;
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
                <ModuleDataComponent moduleId={id}/>
            </div>
        </div>
        </>
    )
 }

export default ModuleData;