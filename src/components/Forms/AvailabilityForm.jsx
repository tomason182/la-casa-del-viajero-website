import styles from "./AvailabilityForm.module.css";
import { useEffect, useState } from "react";
import { format, add } from "date-fns";

export default function AvailabilityForm() {
  const today = new Date().toISOString().split("T")[0];
  const [checkOutMinDate, setCheckOutMinDate] = useState("");
  const [formBody, setFormBody] = useState({
    checkIn: "",
    checkOut: "",
    NumOfGuest: "",
  });

  console.log(checkOutMinDate);

  useEffect(() => {
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
        <input type="number" name="numOfGuest" required aria-required min={1} />
      </div>
      <div>
        <button className={styles.btn}>Buscar disponibilidad</button>
      </div>
    </form>
  );
}
