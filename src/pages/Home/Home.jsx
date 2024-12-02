import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Home.module.css";
import entorno from "../../assets/images/entorno.jpg";
import ambiente from "../../assets/images/ambiente.jpg";
import refugio_1 from "../../assets/images/cuartos/refugio_1.jpg";
import refugio_2 from "../../assets/images/cuartos/refugio_2.jpg";
import refugio_3 from "../../assets/images/cuartos/refugio_3.jpg";
import refugio_4 from "../../assets/images/cuartos/refugio_4.jpg";
import refugio_5 from "../../assets/images/cuartos/refugio_5.jpg";
import refugio_6 from "../../assets/images/cuartos/refugio_6.jpg";
import ranchito_1 from "../../assets/images/cuartos/ranchito_1.jpg";
import ranchito_2 from "../../assets/images/cuartos/ranchito_2.jpg";
import ranchito_3 from "../../assets/images/cuartos/ranchito_3.jpg";
import ranchito_4 from "../../assets/images/cuartos/ranchito_4.jpg";
import ranchito_5 from "../../assets/images/cuartos/ranchito_5.jpg";
import ranchito_6 from "../../assets/images/cuartos/ranchito_6.jpg";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const refugioList = [
    refugio_1,
    refugio_2,
    refugio_3,
    refugio_4,
    refugio_5,
    refugio_6,
  ];

  const ranchitoList = [
    ranchito_1,
    ranchito_2,
    ranchito_3,
    ranchito_4,
    ranchito_5,
    ranchito_6,
  ];

  return (
    <>
      <section className={styles.mainContent}>
        <div className={styles.bookingContent}>
          <h2>Reservá tu próxima estadia</h2>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Acerca de nuestra casa</h2>
        <p>
          En La Casa del Viajero encontraras un entorno cuidado con el cariño de
          quienes aprecian la naturaleza podrás encontrar casas construidas en
          adobe y madera, que las hacen frescas en el verano y cálidas cuando
          llegan los tiempos más fríos, armonizando con el calor humano que
          compartimos en este rincón de la Patagonia cordillerana.
        </p>
        <button>Mas Info</button>
      </section>
      <section className={styles.grid}>
        <div className={styles.image}>
          <img src={entorno} alt="La casa del viajero" />
        </div>
        <div className={styles.content}>
          <h2>Entorno</h2>
          <br />
          <br />
          <p>
            Rodeada de naturaleza, La Casa del Viajero un lugar de paz y
            tranquiladad. A pocos metros del río Quemquemtreu, y enmarcado por
            los árboles que brindan la fresca sombra en el verano, La Casa del
            Viajero te ofrece un lugar que seguramente quedara en tu recurdo.
          </p>
        </div>
        <div className={styles.content}>
          <h2>Ambiente</h2>
          <br />
          <br />
          <p>
            Un ambiente solidario y practico, donde los viajeros de los mas
            diversos puntos se encuentran para compartir su viaje y
            experiencias. Un lugar para descansar, leer un libro o hacer yoga
            durante las mañanas. Desde este punto tendras facil acceso a una
            gran cantidad de lugares de enorme belleza natural, ademas de
            actividades de montaña y aventura
          </p>
        </div>
        <div className={styles.image}>
          <img src={ambiente} alt="La casa del viajero - magica y natural" />
        </div>
      </section>
      <section>
        <h2>Nuestros cuartos</h2>
        <div className={styles.cuartosContainer}>
          <div className={styles.cuarto}>
            <Carousel images={refugioList} currentIndex={currentIndex} />
            <h3>El refugio</h3>
          </div>
          <div className={styles.cuarto}>
            <Carousel images={ranchitoList} currentIndex={currentIndex} />
            <h3>El ranchito</h3>
          </div>
          <div className={styles.cuarto}>
            <h3>La casita</h3>
          </div>
        </div>
      </section>
    </>
  );
}

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={styles.carousel}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentIndex ? 1 : 0,
            visibility: index === currentIndex ? "visible" : "hidden",
            transition: "opacity 0.5s ease, visibility 0.5s ease",
          }}
        />
      ))}
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
};
