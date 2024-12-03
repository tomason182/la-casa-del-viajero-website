import styles from "./AvailabilityForm.module.css";

export default function AvailabilityForm() {
  return (
    <form className={styles.form}>
      <div className={styles.formField}>
        <label>check in</label>
        <input type="date" name="checkIn" required aria-required />
      </div>
      <div className={styles.formField}>
        <label>check out</label>
        <input type="date" name="checkOut" required aria-required />
      </div>
      <div className={styles.formField}>
        <label>huespedes</label>
        <input type="number" name="numOfGuest" required aria-required />
      </div>
    </form>
  );
}
