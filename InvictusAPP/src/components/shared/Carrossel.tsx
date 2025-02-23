import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import banner1 from "../../Utils/imgs/banner1.png";
import banner2 from "../../Utils/imgs/banner2.png";

function Carrossel() {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src={banner1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={banner2} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
}

export default Carrossel;