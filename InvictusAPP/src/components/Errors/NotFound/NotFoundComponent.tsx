import Error404 from "../../../Utils/imgs/notfound.jpg"
import "../NotFound//NotFoundComponent.css"

function NotFound() {
    return (
    <section className="section-not-found">
        <div className="div-not-found">
            <div className="message-not-found">
                <h1>404 - Página não encontrada</h1>
                <p>A página que você está procurando não existe.</p>
            </div>

            <div className="div-not-found-img">
                <img src={Error404} className="img-not-found"/>
            </div>
        </div>
    </section>
    );
  }
  
  export default NotFound;
  