import styles from "./AvailabilityForm.module.css";
import { useEffect, useState } from "react";

export default function AvailabilityForm() {
  const today = new Date().toISOString().split("T")[0];
  const [checkOutMinDate, setCheckOutMinDate] = useState("");
  const [formBody, setFormBody] = useState({
    checkIn: "",
    checkOut: "",
    NumOfGuest: "",
  });

  useEffect(() => {
    function handleCheckOutMinDate() {
      const today = new Date();
      const [year, month, day] = formBody.checkIn
        ? formBody.checkIn.split("-")
        : [today.getFullYear(), today.getMonth() + 1, today.getDate()];
      const checkOutMinDate = `${year}-${month}-${day + 1}`;

      setCheckOutMinDate(checkOutMinDate);
    }

    handleCheckOutMinDate();
  }, [formBody]);

  function handleFormChange(e) {
    e.preventDefault();

    setFormBody({
      ...formBody,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className={styles.form} onChange={handleFormChange}>
      <div className={styles.formField}>
        <label>check in</label>
        <input type="date" name="checkIn" min={today} required aria-required />
      </div>
      <div className={styles.formField}>
        <label>check out</label>
        <input
          type="date"
          name="checkOut"
          required
          aria-required
          min={checkOutMinDate}
        />
      </div>
      <div className={styles.formField}>
        <label>huespedes</label>
        <input type="number" name="numOfGuest" required aria-required />
      </div>
      <div>
        <button className={styles.btn}>Buscar disponibilidad</button>
      </div>
    </form>
  );
}
