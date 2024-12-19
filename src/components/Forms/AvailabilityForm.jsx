import styles from "./AvailabilityForm.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format, add } from "date-fns";

export default function AvailabilityForm({
  setRoomTypeList,
  setIndex,
  propertyId,
  setNumberOfNights,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numOfGuest, setNumOfGuest] = useState("");
  const [checkOutMinDate, setCheckOutMinDate] = useState("");

  useEffect(() => {
    function calculateNumberOfNights() {
      if (checkIn !== "" && checkOut !== "") {
        const [checkInYear, checkInMonth, checkInDate] = checkIn.split("-");
        const [checkOutYear, checkOutMonth, checkOutDate] = checkOut.split("-");
        const checkInFormatted = new Date(
          checkInYear,
          checkInMonth - 1,
          checkInDate
        );
        const checkOutFormatted = new Date(
          checkOutYear,
          checkOutMonth - 1,
          checkOutDate
        );

        const nights =
          (checkOutFormatted - checkInFormatted) / (1000 * 3600 * 24);
        setNumberOfNights(nights);
      }
    }
    calculateNumberOfNights();
  }, [checkIn, checkOut, setNumberOfNights]);

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

    const formattedCheckIn = checkIn.split("-").join("");
    const formattedCheckOut = checkOut.split("-").join("");

    const url =
      import.meta.env.VITE_URL_BASE +
      "/rates-and-availability/check/" +
      propertyId +
      "-" +
      formattedCheckIn +
      "-" +
      formattedCheckOut +
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
    console.log(url);

    fetch(url, options)
      .then(response => {
        if (response.status === 204) {
          throw new Error(
            "Lo siento, no hay cuartos disponibles para las fechas seleccionadas"
          );
        } else if (response.status === 406) {
          throw new Error("¿Que estas intentando hacer Pascual?");
        } else if (response.status >= 400) {
          throw new Error("Server Error");
        }

        return response.json();
      })
      .then(response => {
        console.log("response: ", response);
        setRoomTypeList([...response]);
        setIndex(2);
      })
      .catch(e => setError(e.message))
      .finally(() => {
        setLoading(false);
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
  setRoomTypeList: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
  setNumberOfNights: PropTypes.func.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  setCheckIn: PropTypes.func.isRequired,
  setCheckOut: PropTypes.func.isRequired,
};
