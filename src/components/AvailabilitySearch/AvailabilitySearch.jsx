import styles from "./AvailabilitySearch.module.css";
import PropTypes from "prop-types";

export default function AvailabilitySearch({
  selectedNumGuest,
  setSelectedNumOfGuest,
  availableRoomTypes,
  numberOfNights,
  setIndex,
}) {
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
        <div key={r._id} className={styles.roomTypeContainer}>
          <div className={styles.imageSlider}>
            <h1>Imagenes de cuartos</h1>
          </div>
          <div className={styles.description}>
            <h3>{r.description}</h3>
            <ul>
              {r.amenities.map((amenity, index) => (
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
              ))}
            </ul>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceDetail}>
              <p>us${r.base_rate * numberOfNights}</p>
              <span>Precio para {numberOfNights} noches</span>
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
      );
    });

  return (
    <>
      {availableRoomTypes.length === 0 ? (
        <div className={styles.initialMessage}>
          <h3>
            Para ver el listado de habitacione disponibles, realice una busqueda
          </h3>
        </div>
      ) : (
        <>
          <div className={styles.roomsContainer}>{roomTypeList}</div>
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
                onClick={() => setIndex(1)}
                disabled={
                  Object.keys(selectedNumGuest).length === 0 ||
                  Object.values(selectedNumGuest).every(value => value === "0")
                }
              >
                Reservar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

AvailabilitySearch.propTypes = {
  selectedNumGuest: PropTypes.object.isRequired,
  setSelectedNumOfGuest: PropTypes.func.isRequired,
  availableRoomTypes: PropTypes.array.isRequired,
  numberOfNights: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};
