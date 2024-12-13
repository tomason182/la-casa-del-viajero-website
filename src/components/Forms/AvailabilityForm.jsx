import styles from "./AvailabilityForm.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format, add, sub } from "date-fns";

export default function AvailabilityForm({ formBody, setFormBody }) {
  const today = new Date().toISOString().split("T")[0];
  const [checkOutMinDate, setCheckOutMinDate] = useState("");
  const [checkInMaxDate, setCheckInMaxDate] = useState("");

  useEffect(() => {
    function handleCheckInMaxDate() {
      let checkInMaxDate = "";
      if (formBody.checkOut !== "") {
        const [year, month, day] = formBody.checkOut.split("-");
        const newDate = new Date(year, Number(month) - 1, day);

        checkInMaxDate = format(sub(newDate, { days: 1 }), "yyyy-MM-dd");
      }

      setCheckInMaxDate(checkInMaxDate);
    }

    function handleCheckOutMinDate() {
      const today = new Date();
      const [year, month, day] = formBody.checkIn
        ? formBody.checkIn.split("-")
        : [
            today.getFullYear().toString(),
            (today.getMonth() + 1).toString(),
            today.getDate().toString(),
          ];

      const newDate = new Date(year, Number(month) - 1, day);

      const checkOutMinDate = format(add(newDate, { days: 1 }), "yyyy-MM-dd");

      setCheckOutMinDate(checkOutMinDate);
    }

    handleCheckInMaxDate();
    handleCheckOutMinDate();
  }, [formBody]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const { checkIn, checkOut, numOfGuest } = e.target;

    setFormBody({
      ...formBody,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      numOfGuest: numOfGuest.value,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formField}>
        <label htmlFor="checkIn">check in</label>
        <input
          type="date"
          name="checkIn"
          id="checkIn"
          min={today}
          max={checkInMaxDate}
          required
          aria-required
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
        />
      </div>
      <div>
        <button type="submit" className={styles.btn}>
          Buscar disponibilidad
        </button>
      </div>
    </form>
  );
}

AvailabilityForm.propTypes = {
  formBody: PropTypes.object.isRequired,
  setFormBody: PropTypes.func.isRequired,
};
