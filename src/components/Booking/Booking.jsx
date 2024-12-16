import { useState } from "react";
import styles from "./Booking.module.css";
import countryCodes from "../../utils/mockedData/countryCode.json";

export default function Booking() {
  const [selectedCode, setSelecteCode] = useState("");

  function handlecodeSelection(e) {
    e.preventDefault();

    const [value] = e.target;
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.propertyDetails}>
        <p>Datos de la propiedad</p>
      </div>
      <div className={styles.reservationDetails}>
        <p>Detalle de la reserva</p>
      </div>
      <div className={styles.guestDetails}>
        <form>
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
            <select className={styles.listOfCountries}>
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
                <select className="countryCode" name="countryCode">
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
