import { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import countryCodes from "../../utils/mockedData/countryCode.json";
import PropTypes from "prop-types";

export default function Booking({
  setIndex,
  propertyInfo,
  checkIn,
  checkOut,
  numberOfNights,
  selectedNumGuest,
  availableRoomTypes,
}) {
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedPhoneCode, setSelectedPhoneCode] = useState("");

  useEffect(() => {
    function defaultPhoneSelection() {
      setSelectedPhoneCode(selectedCode);
    }

    defaultPhoneSelection();
  }, [selectedCode]);

  function handleCodeSelection(e) {
    e.preventDefault();

    const value = e.target.value;
    setSelectedCode(value);
  }

  function handlePhoneSelection(e) {
    e.preventDefault();

    const value = e.target.value;
    setSelectedPhoneCode(value);
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

  return (
    <div className={styles.container}>
      <div className={styles.detailsContent}>
        <div className={styles.propertyDetails}>
          <h3>{propertyInfo.property_name}</h3>
          <p>
            {propertyInfo.address.street}, {propertyInfo.address.city},{" "}
            {propertyInfo.address.country}
          </p>
        </div>
        <div className={styles.reservationDetails}>
          <h4>Detalle de la reserva</h4>
          <p>
            <span>Entrada:</span>
            <span>{checkIn}</span>
          </p>
          <p>
            <span>Salida:</span>
            <span>{checkOut}</span>
          </p>
          <p>
            <span>Duración de la estadia:</span>
            <span>
              {numberOfNights} {numberOfNights === 1 ? "noche" : "noches"}
            </span>
          </p>
        </div>
        <div className={styles.reservationDetails}>
          <h4>Desglose del precio</h4>
          <ul>
            {renderRoomDetails(
              availableRoomTypes,
              selectedNumGuest,
              numberOfNights
            )}
          </ul>
          <h4 className={styles.totalPrice}>Total a pagar</h4>
          <p>us$ {totalAmount}</p>
        </div>
      </div>
      <div className={styles.guestDetails}>
        <form className={styles.guestForm}>
          <label>
            Nombre:
            <input type="text" name="firstName" />
          </label>
          <label>
            Apellido:
            <input type="text" name="lastName" />
          </label>
          <label>
            E-mail:
            <input type="email" name="email" />
          </label>
          <label>
            País/Region
            <select
              className={styles.listOfCountries}
              onChange={handleCodeSelection}
            >
              {countryCodes.map(country => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>Numero de telefono</legend>
            <div>
              <label>
                <select
                  className="countryCode"
                  name="countryCode"
                  value={selectedPhoneCode}
                  onChange={handlePhoneSelection}
                >
                  {countryCodes.map(country => (
                    <option key={country.value} value={country.value}>
                      {country.label} {country.code}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

Booking.propTypes = {
  setIndex: PropTypes.func.isRequired,
  propertyInfo: PropTypes.object.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  numberOfNights: PropTypes.number.isRequired,
  selectedNumGuest: PropTypes.object.isRequired,
  availableRoomTypes: PropTypes.array.isRequired,
};
