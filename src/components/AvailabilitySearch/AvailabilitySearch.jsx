import styles from "./AvailabilitySearch.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import casita_1 from "../../assets/images/cuartos/casita_1.png";
import casita_2 from "../../assets/images/cuartos/casita_2.png";
import casita_3 from "../../assets/images/cuartos/casita_3.png";
import casita_4 from "../../assets/images/cuartos/casita_4.png";

export default function AvailabilitySearch({
  selectedNumGuest,
  setSelectedNumOfGuest,
  availableRoomTypes,
  numberOfNights,
  setIndex,
}) {
  //Estas imagenes deberian venir en el objeto tipo de cuarto y ser tomadas desde ahi.
  const casitaList = [casita_1, casita_2, casita_3, casita_4];

  function handleGuestSelection(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setSelectedNumOfGuest({
      ...selectedNumGuest,
      [name]: value,
    });
  }

  function renderBedsOptions(availability, id) {
    const bedsArray = [];

    for (let i = 0; i <= Number(availability); i++) {
      bedsArray.push(i);
    }

    const bedsOptions = bedsArray.map(bed => (
      <option key={`${id}-${bed}`} value={bed}>
        {bed}
      </option>
    ));

    return (
      <select name={id} onChange={handleGuestSelection}>
        {bedsOptions}
      </select>
    );
  }

  let totalAmount = 0;
  function renderRoomDetails(roomTypesList, selectedRooms, nights) {
    return Object.keys(selectedRooms).map(obj => {
      const room = roomTypesList.find(r => r._id === obj);
      if (selectedRooms[obj] === "0") {
        return false;
      }
      totalAmount += nights * room.base_rate * selectedRooms[obj];
      return (
        <li key={obj}>
          <p>
            {selectedRooms[obj]} * {room.description}
          </p>
          <p>us$ {nights * room.base_rate * selectedRooms[obj]}</p>
        </li>
      );
    });
  }

  const roomTypeList =
    availableRoomTypes &&
    availableRoomTypes.map(r => {
      return (
        <div key={r._id} className={styles.roomContainer}>
          <div className={styles.imageSlider}>
            <Carousel images={casitaList} />
          </div>
          <div className={styles.hostelInfo}>
            <div className={styles.description}>
              <h3>{r.description}</h3>
              <ul>
                <p>amenities aca</p>
                {/*               {r.amenities.map((amenity, index) => (
                <li key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#26701c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {amenity}
                </li>
              ))} */}
              </ul>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.priceDetail}>
                <p>us${r.base_rate * numberOfNights}</p>
                <span>
                  Precio para {numberOfNights}{" "}
                  {numberOfNights === 1 ? "noche" : "noches"}
                </span>
                <span>
                  {r.type === "dorm"
                    ? "1 persona"
                    : `${r.max_occupancy} personas`}
                </span>
              </div>
              <div className={styles.bedSelection}>
                {renderBedsOptions(r.availability, r._id)}
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className={styles.container}>
      <div>{roomTypeList}</div>
      <div className={styles.priceDetailContainer}>
        <h3>Detalle de la reserva</h3>
        {Object.keys(selectedNumGuest).length === 0 ||
        Object.values(selectedNumGuest).every(value => value === "0") ? (
          <p className={styles.noRoom}>
            Seleccione los cuartos que desea reservar para continuar
          </p>
        ) : (
          <div className={styles.reservationDetails}>
            <div>
              <p>Estadia {numberOfNights} noches</p>
            </div>
            <div className={styles.roomList}>
              <ul>
                {renderRoomDetails(
                  availableRoomTypes,
                  selectedNumGuest,
                  numberOfNights
                )}
              </ul>
            </div>
            <div>
              <h3>Total: us$ {totalAmount}</h3>
            </div>
          </div>
        )}
        <div>
          <button
            onClick={() => setIndex(3)}
            disabled={
              Object.keys(selectedNumGuest).length === 0 ||
              Object.values(selectedNumGuest).every(value => value === "0")
            }
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

AvailabilitySearch.propTypes = {
  selectedNumGuest: PropTypes.object.isRequired,
  setSelectedNumOfGuest: PropTypes.func.isRequired,
  availableRoomTypes: PropTypes.array.isRequired,
  numberOfNights: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  roomImages: PropTypes.array.isRequired,
};

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
