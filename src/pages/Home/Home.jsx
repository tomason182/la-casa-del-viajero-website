import { useState } from "react";
import PropTypes from "prop-types";
import Location from "../../components/Location/Location";
import AvailabilityForm from "../../components/Forms/AvailabilityForm";
import styles from "./Home.module.css";
import entorno from "../../assets/images/entorno.png";
import ambiente from "../../assets/images/ambiente.png";
import refugio_1 from "../../assets/images/cuartos/refugio_1.jpg";
import refugio_2 from "../../assets/images/cuartos/refugio_2.png";
import refugio_3 from "../../assets/images/cuartos/refugio_3.png";
import refugio_4 from "../../assets/images/cuartos/refugio_4.png";
import refugio_5 from "../../assets/images/cuartos/refugio_5.png";
import refugio_6 from "../../assets/images/cuartos/refugio_6.png";
import ranchito_1 from "../../assets/images/cuartos/ranchito_1.png";
import ranchito_2 from "../../assets/images/cuartos/ranchito_2.png";
import ranchito_3 from "../../assets/images/cuartos/ranchito_3.png";
import ranchito_4 from "../../assets/images/cuartos/ranchito_4.png";
import ranchito_5 from "../../assets/images/cuartos/ranchito_5.png";
import ranchito_6 from "../../assets/images/cuartos/ranchito_6.png";
import ranchito_7 from "../../assets/images/cuartos/ranchito_7.png";
import casita_1 from "../../assets/images/cuartos/casita_1.png";
import casita_2 from "../../assets/images/cuartos/casita_2.png";
import casita_3 from "../../assets/images/cuartos/casita_3.png";
import casita_4 from "../../assets/images/cuartos/casita_4.png";

export default function Home() {
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
    ranchito_7,
  ];

  const casitaList = [casita_1, casita_2, casita_3, casita_4];

  const hostelInfo = {
    address: "Av. Las Flores 4220",
    phone: "294 - 4xxx - xxxx",
  };

  return (
    <>
      <section className={styles.mainContent}>
        <div className={styles.bookingContent}>
          <h2>Reservá tu próxima estadia</h2>
          <AvailabilityForm />
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
          <img src={ambiente} alt="La casa del viajero" />
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
          <img src={entorno} alt="La casa del viajero - magica y natural" />
        </div>
      </section>
      <section>
        <h2>Nuestros cuartos</h2>
        <div className={styles.cuartosContainer}>
          <div className={styles.cuarto}>
            <Carousel images={refugioList} />
            <h3>El refugio</h3>
          </div>
          <div className={styles.cuarto}>
            <Carousel images={ranchitoList} />
            <h3>El ranchito</h3>
          </div>
          <div className={styles.cuarto}>
            <Carousel images={casitaList} />
            <h3>La casita</h3>
          </div>
        </div>
      </section>
      <section>
        <Location address={hostelInfo.address} phone={hostelInfo.phone} />
      </section>
    </>
  );
}

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrev() {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNext() {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div className={styles.carousel}>
      <button className={styles.arrowLeft} onClick={handlePrev}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className={styles.arrowRight} onClick={handleNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            opacity: index === currentIndex ? 1 : 0,
            display: index === currentIndex ? "block" : "none",
            transition: "opacity 0.5s ease, visibility 0.5s ease",
          }}
        />
      ))}
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
};
