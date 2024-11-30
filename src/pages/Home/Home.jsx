import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.mainContent}>
      <div className={styles.bookingContent}>
        <p>Reservations</p>
      </div>
    </section>
  );
}
