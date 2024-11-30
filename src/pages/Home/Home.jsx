import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.mainContent}>
        <div className={styles.bookingContent}>
          <h2>Reservá tu próxima estadia</h2>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Acerca de nuestra casa</h2>
      </section>
    </>
  );
}
