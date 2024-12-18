import styles from "./AvailabilityForm.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format, add, sub } from "date-fns";

export default function AvailabilityForm({ setDates, setIndex, propertyId }) {
  const today = new Date().toISOString().split("T")[0];
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuest, setNumOfGuest] = useState("");
  const [checkOutMinDate, setCheckOutMinDate] = useState("");

  useEffect(() => {
    function handleCheckOutMinDate() {
      const [year, month, day] =
        checkIn !== "" ? checkIn.split("-") : today.split("-");

      const newDate = new Date(year, Number(month) - 1, day);

      setCheckOutMinDate(format(add(newDate, { days: 1 }), "yyyy-MM-dd"));
    }

    handleCheckOutMinDate();
  }, [checkIn, today]);

  function handleFormSubmit() {
    setLoading(true);

    const url =
      import.meta.env.VITE_URL_BASE +
      "/rates-and-availability/check/" +
      propertyId +
      "-" +
      checkIn +
      "-" +
      checkOut +
      "-" +
      numOfGuest;
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    console
      .log(url, options)
      .then(response => {
        if (response.status === 204) {
          throw new Error(
            "Lo siento, no hay cuartos disponibles para las fechas seleccionadas"
          );
        }
        if (response.status >= 400) {
          throw new Error("Server Error");
        }

        return response.json();
      })
      .then(response => setRoomTypeList(response))
      .catch(e => setError(e))
      .finally(() => {
        setLoading(false);
        setIndex(2);
      });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formField}>
        <label htmlFor="checkIn">check in</label>
        <input
          type="date"
          name="checkIn"
          id="checkIn"
          min={today}
          required
          aria-required
          onChange={e => setCheckIn(e.target.value)}
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="checkOut">check out</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          required
          aria-required
          min={checkOutMinDate}
          onChange={e => setCheckOut(e.target.value)}
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="numOfGuest">huespedes</label>
        <input
          type="number"
          id="numOfGuest"
          name="numOfGuest"
          required
          aria-required
          min={1}
          onChange={e => setNumOfGuest(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className={styles.btn}>
          Buscar disponibilidad
        </button>
      </div>
      <div className={styles.error}>{error}</div>
    </form>
  );
}

AvailabilityForm.propTypes = {
  dates: PropTypes.object.isRequired,
  setDates: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
};
